import styles from "./PetCard.module.css";

function PetCard({ gender,name, breed, age, avatar }) {
  const initial = name ? name[0].toUpperCase() : "?";
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt={`${name} profile`} />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <div>
        <p className={styles.name}>{name || "Pet name"}</p>
        <p className={styles.meta}>
          {age ? ` · ${age}` : ""}
          {gender? `${gender}`: ""}
        </p>
      </div>
    </div>
  );
}

export default PetCard;
