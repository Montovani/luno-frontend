import styles from "./SitterCard.module.css";

function SitterCard() {
  return (
    <div className={styles.cardContainer}>
      <div></div>
      <div className={styles.imgContainer}>
        
      </div>
      <div className={styles.cardTitleSub}>
        <h3>John</h3>
        <p>Just a pet lover</p>
      </div>
      <div className={styles.petCared}>
        <div>
          <p>Small Dog</p>
        </div>
        <div>
          <p>Cat</p>
        </div>
      </div>
    </div>
  );
}

export default SitterCard;
