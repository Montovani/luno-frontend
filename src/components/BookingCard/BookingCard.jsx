import styles from "./BookingCard.module.css";

function BookingCard({ booking, variant}) {
  if (!booking) return null;
  console.log(booking)
  const petInitial = booking.petName
    ? booking.petCared[0].name.toUpperCase()
    : "?";

  return (
    <div className={styles.card}>
      <div className={styles.petInfo}>
        <div className={styles.avatar}>
          {booking.petCared[0].avatar ? (
            <img src={booking.petCared[0].avatar} alt={`${booking.petName} profile`} />
          ) : (
            <span>{petInitial}</span>
          )}
        </div>
        <div>
          <p className={styles.petName}>{booking.petCared[0].name || "Pet"}</p>
          <p className={styles.petMeta}>
            {booking.petCared[0].gender}
          </p>
        </div>
      </div>

      <div className={styles.dateGroup}>
        <div>
          <p className={styles.label}>From</p>
          <p className={styles.value}>{booking.dateStart.split("T")[0] || "--"}</p>
        </div>
        <span className={styles.arrow}>&#8250;</span>
        <div>
          <p className={styles.label}>Until</p>
          <p className={styles.value}>{booking.dateEnd.split("T")[0] || "--"}</p>
        </div>
      </div>

      <div className={styles.statusBlock}>
        <p className={styles.label}>Status</p>
        <p className={styles.status}>{booking.status || "Pending"}</p>
      </div>

      <div className={styles.pointsBlock}>
        <p className={styles.label}>Total</p>
        <p className={styles.value}>
          {booking.lunies ? `${booking.lunies} Lunies` : "--"}
        </p>
      </div>

      {variant === "past" ? (
        <div className={styles.ratingBlock}>
          <span className={styles.star}>★</span>
          <span className={styles.rating}>
            {booking.rating ? booking.rating : "—"}
          </span>
        </div>
      ) : null}

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton}>
          Check details
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
