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
    const [imageUrl, setImageUrl] = useState(userInfo.mainProfilePhoto)
    const [avatarUrl, setAvatarUrl] = useState(userInfo.avatar)
    const [isUploading, setIsUploading] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setErrorMessage("")

        try {
            const body = {
                name: inputName,
                city: inputCity,
                aboutUser: inputAbout,
                petsCategoryAllowed: petsTakeCare,
                avatar: avatarUrl,
                mainProfilePhoto: imageUrl
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
    
        // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
    const handleFileUpload = async (e, typeOfImage) => {
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
       
        if(typeOfImage === 'avatar'){
            setAvatarUrl(response.data.imageUrl)
        }
        if(typeOfImage === 'main'){
            setImageUrl(response.data.imageUrl);
        }
        //                          |
        //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

        setIsUploading(false); // to stop the loading animation
    } catch (error) {
        navigate("/error");
    }
    };
    
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
            <div style={{display:'flex', gap:'1rem', flexWrap: 'wrap', marginTop:'2rem'}}>
                <div>
                    <h4>Add/Edit Avatar Image</h4>
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => handleFileUpload(e, "avatar")}
                        disabled={isUploading}
                    />
                    <div>
                        <button onClick={()=> setAvatarUrl(null)}>Delete</button>
                    </div>
                    {/* below disabled prevents the user from attempting another upload while one is already happening */}
                </div>;

                {/* to render a loading message or spinner while uploading the picture */}
                {isUploading ? <h3>... uploading image</h3> : null}

                {/* below line will render a preview of the image from cloudinary */}
                {avatarUrl ? (<div><img src={avatarUrl} alt="img" width={200} /></div>) : null}
                <div>
                    <h4>Add/Edit Profile Image</h4>
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => handleFileUpload(e, "main")}
                        disabled={isUploading}
                    />
                    <div>
                        <button onClick={()=> setImageUrl(null)}>Delete</button>
                    </div>
                    {/* below disabled prevents the user from attempting another upload while one is already happening */}
                </div>;

                {/* to render a loading message or spinner while uploading the picture */}
                {isUploading ? <h3>... uploading image</h3> : null}

                {/* below line will render a preview of the image from cloudinary */}
                {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}
            </div>
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
