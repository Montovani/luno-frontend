import styles from "./SitterCard.module.css";

function SitterCard({name,petsCategoryAllowed,mainProfilePhoto}) {
  return (
    <div className={styles.cardContainer}>
      <div></div>
      <div className={styles.imgContainer}>
        <img style={{width:'100%', height:'100%', objectFit:'cover'}} src={mainProfilePhoto} alt="" />
      </div>
      <div className={styles.cardTitleSub}>
        <h3>{name}</h3>
        <p>Just a pet lover</p>
      </div>
      <div className={styles.petCared}>
        {petsCategoryAllowed.map((pet,index)=>{
            return (
                <div key={index}>
                    <p>{pet}</p>
                </div>
            )
        })}
      </div>
    </div>
  );
}

export default SitterCard;
