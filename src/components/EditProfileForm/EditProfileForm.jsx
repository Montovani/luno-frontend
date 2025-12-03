import { useState } from 'react'
import styles from './EditProfileForm.module.css'
import service from '../../../services/config.services'

function EditProfileForm({userInfo, getUserApiData}) {
    //Maybe add the 
    const [inputName, setInputName] = useState(userInfo.name)
    const [inputCity, setInputCity] = useState(userInfo.city)
    const [inputAbout, setInputAbout] = useState(userInfo.aboutUser)
    const [petsTakeCare, setPetsTakeCare] = useState(
    userInfo.petsCategoryAllowed);
    const[isSubmiting,setIsSubmiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setErrorMessage("")

        try {
            const body = {
                name: inputName,
                city: inputCity,
                aboutUser: inputAbout,
                petsCategoryAllowed: petsTakeCare
            }
            setIsSubmiting(true)
            await service.patch(`/user/${userInfo._id}`,body)

            setInputName("")
            setInputCity("")
            setInputAbout("")
            setIsSubmiting(false)
            getUserApiData()
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.errorMessage)
            setIsSubmiting(false)
        }
        
    }
    if(!userInfo){
        return <h3>Loading...</h3>
    }
  return (
    <div className={styles.editProfileFormContainer}>
        <form onSubmit={handleSubmit}>
            <h4>Name</h4>
            <input 
            type="text" 
            placeholder={userInfo.name}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            />
            <h4>City</h4>
            <input 
            type="text" 
            placeholder={userInfo.city}
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            />
            <h4>About You</h4>
            <textarea
            placeholder={userInfo.aboutUser? userInfo.aboutUser: "Add about you "}
            value={inputAbout}
            onChange={(e)=> setInputAbout(e.target.value)}
            />
            <h4>Pets Can Take Care</h4>
            <div className={styles.takeCareContainer}> 
            {petsTakeCare.length>0? (
            petsTakeCare.map((pet,index)=>{
                return <div key={index} className={styles.divPet}><p>{pet}</p></div>
            })):(
            <p className={styles.divPet}>No pets</p>
            )}
            </div>
            <select
                onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;

                    setPetsTakeCare((prev) => {
                    
                    if (prev.includes(value)){
                        return prev;
                    } else {
                        return [...prev, value];
                    }
                    });
                }}
            >
                <option value="">Select a pet</option>
                <option value="cat">Cat</option>
                <option value="small dog">Small Dog</option>
                <option value="medium dog">Medium Dog</option>
                <option value="big dog">Big Dog</option>
            </select>
                 {errorMessage ? (
                            <p className={styles.errorBox}>{errorMessage}</p>
                          ) : null}
            <div className={styles.btnSaveForm}>
                <button type='submit' disabled={isSubmiting} className='button button-edit'>Save Information</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfileForm
