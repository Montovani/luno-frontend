import styles from './EditablePetCard.module.css'

function FullPetCard({pet}) {
    const {
      _id,
      name,
      category,
      avatar,
      gender,
      dateOfBirth,
      isHouseTrained,
      isNeutered,
      specialInstructions,
    } = pet || {};
  
    const initial = name ? name[0].toUpperCase() : "?";
    const dobLabel = (() => {
      if (!dateOfBirth) return "Not set";
      const parsedDate = new Date(dateOfBirth);
      if (Number.isNaN(parsedDate.getTime())) return dateOfBirth;
      return parsedDate.toLocaleDateString();
    })();
  
    return (
      <div className={styles.card}>
        <div className={styles.avatar}>
          {avatar ? (
            <img src={avatar} alt={`${name} profile`} />
          ) : (
            <span>{initial}</span>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <p className={styles.name}>{name || "Pet name"}</p>
            {category ? <span className={styles.badge}>{category}</span> : null}
          </div>
          <p className={styles.meta}>
            {gender || "Gender not set"}
            {dateOfBirth ? ` • Born ${dobLabel}` : ""}
          </p>
          <div className={styles.flags}>
            <span
              className={`${styles.flag} ${
                isHouseTrained ? styles.flagOn : ""
              }`}
            >
              House trained: {isHouseTrained ? "Yes" : "No"}
            </span>
            <span
              className={`${styles.flag} ${isNeutered ? styles.flagOn : ""}`}
            >
              Neutered: {isNeutered ? "Yes" : "No"}
            </span>
          </div>
          {specialInstructions ? (
            <p className={styles.instructions}>{specialInstructions}</p>
          ) : null}
        </div>
      </div>
    );
}

export default FullPetCard
