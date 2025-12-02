import { useEffect, useState } from "react";
import styles from "./Request.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function Request() {
  const [sitterInfo, setSitterInfo] = useState(null); 
  const [ownerPets, setOwnerPets] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPets, setSelectedPets] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  const {userId} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    getUserApiInfo()
    getRequesterPetApiInfo()
  },[])

  const getUserApiInfo = async() =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${userId}`)
      setSitterInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getRequesterPetApiInfo = async()=>{
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/pet/owner`,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      setOwnerPets(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const sitterName =
    sitterInfo && sitterInfo.name
      ? sitterInfo.name[0].toUpperCase().concat("", sitterInfo.name.slice(1))
      : "your sitter";

  const handlePetSelection = (petId) => {
    setSelectedPets((prev) =>
      prev.includes(petId)
        ? prev.filter((pet) => pet !== petId)
        : [...prev, petId]
    );
  };

  const startBooking = new Date(startDate);
  const endBooking = new Date(endDate);
  const millisecondsInDay = 86400000;
  const totalDays = (endBooking.getTime() - startBooking.getTime()) / millisecondsInDay + 1;

  const estimatedPoints =
    selectedPets.length > 0 ? (selectedPets.length * totalDays * 10) : 10;

  const handleSubmit = async(event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!startDate || !endDate || selectedPets.length === 0) {
      setErrorMessage("Add stay dates and select at least one pet.");
      return;
    }
    const body = {
      host: userId,
      dateStart: startDate,
      dateEnd: endDate,
      petCared: selectedPets,
      message,
    }
    try {
      const token = localStorage.getItem('authToken')
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/booking`,body,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      setStartDate("");
      setEndDate("");
      setMessage("");
      setSelectedPets([]);
      setErrorMessage("");
      setIsSubmitting(false)

      setSuccessMessage("Your booking was created 🎉")

      setTimeout(() => {
      navigate("/dashboard");
      }, 1500)
      
    }catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.errorMessage)
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.pageTitle}>Send the request to {sitterName}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Date of Stay</p>
            <p className={styles.sectionSubtitle}>
              Add the start day and the last day your pet will be in{" "}
              {sitterName}'s house
            </p>
            <div className={styles.dateRow}>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className={styles.input}
              />
              <span className={styles.chevron}>&#8250;</span>
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.section}>
            <p className={styles.sectionTitle}>
              Pet will be with {sitterName}
            </p>
            <div className={styles.petSection}>
              <div className={styles.petList}>
                {ownerPets.length === 0 ? (
                  <p className={styles.muted}>No pets found for this account.</p>
                ) : (
                  ownerPets.map((pet) => {
                    const petId = pet._id || pet.id;
                    return (
                      <button
                        type="button"
                        key={petId}
                        className={`${styles.petCard} ${
                          selectedPets.includes(petId)
                            ? styles.petCardSelected
                            : ""
                        }`}
                        onClick={() => handlePetSelection(petId)}
                      >
                        <div className={styles.petAvatar}></div>
                        <div className={styles.petInfo}>
                          <p className={styles.petName}>{pet.name}</p>
                          <p className={styles.petMeta}>
                            {pet.gender ? ` ${pet.gender}` : ""}
                          </p>
                        </div>
                        <span className={styles.checkIcon}>
                          {selectedPets.includes(petId) ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Total</p>
            <p className={styles.total}>{estimatedPoints} lunes</p>
          </div>

          <div className={styles.section}>
            <label className={styles.sectionTitle} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className={styles.textArea}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Add anything the sitter should know about your pet."
            ></textarea>
          </div>

          {errorMessage ? (
            <p className={styles.errorBox}>{errorMessage}</p>
          ) : null}

          {successMessage && (
              <p className={styles.successBox}>{successMessage}</p>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send the request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Request
