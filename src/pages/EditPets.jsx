import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EditablePetCard from "../components/PetCard/EditablePetCard";
import styles from "./EditPets.module.css";
import service from "../../services/config.services";

function EditPets() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [petAvatar, setPetAvatar] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petDOB, setPetDOB] = useState("");
  const [isHouseTrained, setIsHouseTrained] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  useEffect(()=>{
    getPetApiData()
  },[])
  const handleProfileBtn = () => {
    navigate("/edit-profile");
  };
  
  const getPetApiData = async()=> {
      try {
          const response = await service.get('/pet/owner')
          setPets(response.data)
      } catch (error) {
          console.log(error)
      }
  }
  const handleDeletePet = async(petId) => {

    try {
        await service.delete(`/pet/${petId}`)
        setPets((prev) => prev.filter((pet) => (pet._id || pet.name) !== petId));
    } catch (error) {
        console.log(error)
    }

  };
  const handleAddPet = async(event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const newPet = {
      name: petName,
      category: petCategory,
      avatar: petAvatar,
      gender: petGender,
      dateOfBirth: new Date(petDOB),
      isHouseTrained,
      isNeutered,
      specialInstructions,
      avatar: avatarUrl
    };

    try {
        await service.post('/pet',newPet)
        setPets((prev) => [...prev, newPet]);
        setPetName("");
        setPetCategory("");
        setPetAvatar("");
        setPetGender("");
        setPetDOB("");
        setIsHouseTrained(false);
        setIsNeutered(false);
        setSpecialInstructions("");
        setIsSubmitting(false);
        setAvatarUrl(null)
    } catch (error) {
        console.log(error)
    }

   
};

const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!e.target.files[0]) {
        // to prevent accidentally clicking the choose file button and not selecting a file
        return;
    }

    setIsUploading(true); 
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", e.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
        const response = await service.post('/upload', uploadData)
        setAvatarUrl(response.data.imageUrl)
        
        //                          |
        //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

        setIsUploading(false); // to stop the loading animation
    } catch (error) {
        console.log(error)
    }
    };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <button onClick={handleProfileBtn} className="button">
          User Information
        </button>
        <button className="button">Pets</button>
      </div>

      <div className={styles.section}>
        <h3>Your Pets</h3>
        <div className={styles.petList}>
          {pets.length === 0 ? (
            <p className={styles.placeholder}>
              Add your pets to see them here.
            </p>
          ) : (
            pets.map((pet) => (
              <EditablePetCard
                key={pet._id || pet.name}
                pet={pet}
                onDelete={handleDeletePet}
              />
            ))
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Add a New Pet</h3>
        <form className={styles.form} onSubmit={handleAddPet}>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Luna"
                required
              />
            </label>
            <label className={styles.field}>
              <span>Category</span>
              <select
                value={petCategory}
                onChange={(e) => setPetCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="cat">Cat</option>
                <option value="small dog">Small Dog</option>
                <option value="medium dog">Medium Dog</option>
                <option value="big dog">Big Dog</option>
              </select>
            </label>
            <label className={styles.field}>
              <span>Gender</span>
              <select
                value={petGender}
                onChange={(e) => setPetGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
            <label className={styles.field}>
              <span>Date of Birth</span>
              <input
                type="date"
                value={petDOB}
                onChange={(e) => setPetDOB(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Photo URL</span>
              <input
                type="url"
                value={petAvatar}
                onChange={(e) => setPetAvatar(e.target.value)}
                placeholder="https://"
              />
            </label>
          </div>
          <div className={styles.checkboxRow}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={isHouseTrained}
                onChange={(e) => setIsHouseTrained(e.target.checked)}
              />
              <span>House trained</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={isNeutered}
                onChange={(e) => setIsNeutered(e.target.checked)}
              />
              <span>Neutered</span>
            </label>
          </div>
          <label className={styles.field}>
            <span>Special Instructions</span>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Feeding, walks, routines..."
              rows={3}
            />
          </label>
          <div>
            <h4>Add/Edit Avatar Image</h4>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <div>
              <button onClick={() => setAvatarUrl(null)}>Delete</button>
            </div>
            {/* below disabled prevents the user from attempting another upload while one is already happening */}
          </div>
          ;
          {/* to render a loading message or spinner while uploading the picture */}
          {isUploading ? <h3>... uploading image</h3> : null}
          {/* below line will render a preview of the image from cloudinary */}
          {avatarUrl ? (
            <div>
              <img src={avatarUrl} alt="img" width={200} />
            </div>
          ) : null}
          {errorMessage ? (
            <p className={styles.errorBox}>{errorMessage}</p>
          ) : null}
          <div className={styles.actions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-edit"
            >
              Save Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPets;
