import { capitalizeSentence } from "../../utils/functions";
import styles from "./SitterCard.module.css";
function SitterCard({name,petsCategoryAllowed,mainProfilePhoto, avatar}) {
  return (
    <div className={styles.cardContainer}>
      <div></div>
      <div className={styles.imgContainer}>
        <img style={{width:'100%', height:'100%', objectFit:'cover'}} src={mainProfilePhoto} alt="" />
      </div>
      <div className={styles.avatarContainer}>
        <img style={{width:'100%', height:'100%', objectFit:'cover'}} src={avatar} alt="" />
      </div>
      <div className={styles.cardTitleSub}>
        <h3>{capitalizeSentence(name)}</h3>
        
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
