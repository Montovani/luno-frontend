import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import UserCard from "../components/UserCard/UserCard";
import PetCard from "../components/PetCard/PetCard";
import BookingCard from "../components/BookingCard/BookingCard";
import axios from "axios";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [luniesBalance, setLuniesBalance] = useState(208);
  const [pets, setPets] = useState(null);
  const [bookings, setBookings] = useState(null)

  useEffect(()=>{
    getUserApiInfo()
  },[])

  const getUserApiInfo = async()=>{
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/dashboard`,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      setLuniesBalance(response.data.lunies)
      setUserInfo({
        name: response.data.name,
        location: response.data.city,
        avatar: response.data.avatar
      })
      setPets(response.data.pets)
      setBookings(response.data.booking)
    } catch (error) {
      console.log(error)
    }
  }
  if(!userInfo || !pets || !bookings){
    return <h3>Loading...</h3>
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.greeting}>
          Welcome {userInfo.name}
        </h2>
        <p className={styles.balance}>
          You have{" "}
          <span className={styles.balanceValue}>{luniesBalance}</span> Lunies
        </p>
      </header>

      <section className={styles.profileRow}>
        <div>
          <h3 className={styles.sectionTitle}>Your Profile</h3>
          <UserCard
            name={userInfo.name}
            location={userInfo.location}
            avatar={userInfo.avatar}
            badgeAvatar={userInfo.badgeAvatar}
          />
        </div>

        <div className={styles.petsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Pets</h3>
          </div>
          <div className={styles.petList}>
            {pets.length === 0 ? (
              <p className={styles.placeholder}>
                Add your pets to see them here.
              </p>
            ) : (
              pets.map((pet) => (
                <PetCard
                  key={pet._id}
                  name={pet.name}
                  gender={pet.gender}
                  avatar={pet.avatar}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Upcoming Pet Sitting</h3>
        </div>
        <div className={styles.cardColumn}>
          {bookings.length === 0 ? (
            <p className={styles.placeholder}>No upcoming bookings yet.</p>
          ) : (
            bookings
            .filter((booking)=>{
              return booking.status === 'pending'
            })
            .map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                variant="upcoming"
              />
            ))
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Pet Sitting History</h3>
        </div>
        <div className={styles.cardColumn}>
          {bookings.length === 0 ? (
            <p className={styles.placeholder}>No past bookings yet.</p>
          ) : (
            bookings
            .filter((booking)=>{
              return ['in progress', 'confirmed', 'completed', 'canceled'].includes(booking.status)
            })
            .map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                variant="upcoming"
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
