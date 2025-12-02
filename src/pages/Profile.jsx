import { useParams } from "react-router";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userReviews, setUserReviews] = useState(null)

  useEffect(() => {
    getUserApiData();
    getUserApiReviews()
  }, []);

  const getUserApiData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/user/${userId}`
      );
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserApiReviews = async()=>{
    try {
        const response = await axios.get( `${import.meta.env.VITE_SERVER_URL}/api/review/user/${userId}`)
        setUserReviews(response.data)
    } catch (error) {
        console.log(error)
    }
  }
  console.log(userReviews)
  if (!userInfo || !userReviews) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.avatarContainer}></div>
        <div>
          <h1>
            {userInfo.name[0].toUpperCase().concat("", userInfo.name.slice(1))}
          </h1>
          <p>Headline</p>
        </div>
        <div>
          <button className={styles.buttonHeader}>Send Request</button>
        </div>
      </div>
      <div className={styles.profileSectionContainer}>
        <div className={styles.firstSection}>
          <div className={styles.mainPhotosContainer}>

          </div>
          <h3>About</h3>
          <p>{userInfo.aboutUser}</p>
          <div className={styles.petsAndCare}>
            <div>
              <h4>
                {userInfo.name[0]
                  .toUpperCase()
                  .concat("", userInfo.name.slice(1))}
                's Pet
              </h4>
              {userInfo.pets.map((pet)=>{
                return(
                    <div key={pet._id} className={styles.userPetContainer}>
                        <div className={styles.avatarPet}>

                        </div>
                        <div>
                            <p>{pet.name}</p>
                            <p>{pet.gender}</p>
                        </div>
                    </div>
                )
              })}
            </div>
            <div>
              <h4>
                {userInfo.name[0]
                  .toUpperCase()
                  .concat("", userInfo.name.slice(1))}{" "}
                Can Take Care:
              </h4>
              <div className={styles.petCared}>
              {userInfo.petsCategoryAllowed.map((pet, index) => {
                return (
                  <div key={index}>
                    <p>{pet}</p>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
          <div>
            <h3>{userInfo.name[0].toUpperCase().concat("",userInfo.name.slice(1))}' Home</h3>
            <div className={styles.homeRules}>
                {userInfo.homeInformation.map((homeInfo,index)=>{
                    return (
                        <div key={index}>
                            <p>{homeInfo}</p>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
        <div className={styles.secondSection}>
            <div>
                <h3>What people say about {userInfo.name}</h3>
                <div className={styles.reviewsContainer}>
                {userReviews.map((each)=>{
                    return (
                        <>
                            <p>{each.review.owner.name}</p>
                            <p>{each.review.text}</p>
                            <p>{each.review.stars} Stars</p>
                        </>
                    )
                })}
                </div>
            </div>
            <div className={styles.mapContainer}>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
