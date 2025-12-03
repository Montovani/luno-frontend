import { useNavigate } from "react-router";
import styles from "./BookingCard.module.css";

function BookingCard({ booking, variant }) {
  if (!booking) return null;
  const navigate = useNavigate()

  const handleCheckBooking = ()=>{
    navigate(`/booking/${booking._id}`)
  }

  // Pegamos o primeiro pet (se existir)
  const pet = booking.petCared?.[0];

  // Inicial da letra
  const petInitial = pet?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className={styles.card}>
      <div className={styles.petInfo}>
        <div className={styles.avatar}>
          {pet?.avatar ? (
            <img src={pet.avatar} alt={`${pet?.name || "Pet"} profile`} />
          ) : (
            <span>{petInitial}</span>
          )}
        </div>

        <div>
          <p className={styles.petName}>{pet?.name || "Pet"}</p>
          <p className={styles.petMeta}>{pet?.gender || "—"}</p>
        </div>
      </div>

      <div className={styles.dateGroup}>
        <div>
          <p className={styles.label}>From</p>
          <p className={styles.value}>{booking.dateStart?.split("T")[0] || "--"}</p>
        </div>

        <span className={styles.arrow}>&#8250;</span>

        <div>
          <p className={styles.label}>Until</p>
          <p className={styles.value}>{booking.dateEnd?.split("T")[0] || "--"}</p>
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
          <span className={styles.rating}>{booking.rating || "—"}</span>
        </div>
      ) : null}

      <div className={styles.actions}>
        <button onClick={handleCheckBooking} type="button" className={styles.secondaryButton}>
          Check details
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
