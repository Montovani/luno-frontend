import styles from "./UserCard.module.css";

function UserCard({ name, location, avatar, badgeAvatar }) {
  const initial = name ? name[0].toUpperCase() : "U";

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <div className={styles.avatar}>
          {avatar ? (
            <img src={avatar} alt={`${name} profile`} />
          ) : (
            <span>{initial}</span>
          )}
        </div>
        {badgeAvatar ? (
          <div className={styles.badge}>
            <img src={badgeAvatar} alt="User badge" />
          </div>
        ) : null}
      </div>

      <div className={styles.text}>
        <p className={styles.name}>{name || "Add your name"}</p>
        <p className={styles.location}>
          {location ? `Location: ${location}` : "Add your location"}
        </p>
      </div>

      <button className={styles.button} type="button">
        Edit information
      </button>
    </div>
  );
}

export default UserCard;
