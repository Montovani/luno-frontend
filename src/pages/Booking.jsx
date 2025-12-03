import styles from './Booking.module.css'
import UserCard from "../components/UserCard/UserCard";
import FullPetCard from '../components/PetCard/FullPetCard';
function Booking() {
  return (
    <div className={styles.bookingContainer}>
        <h3 className={styles.title}>Pet Sitting Book</h3>
        <section className={styles.section}>
            <div className={styles.firstHalf}>
                <h4>Date</h4>
                <div className={styles.dateContainer}>
                    <div>
                        <p>From</p>
                        <p>25/10/20</p>
                    </div>
                    <div>
                        <p style={{fontSize:'3rem'}}>&rsaquo;</p>
                    </div>
                    <div>
                        <p>Until</p>
                        <p>25/10/20</p>
                    </div>
                </div>
                <h4>Status of Reservation </h4>
                <div className={styles.statusContainer}>
                    <p>Confirmed</p>
                    <button>Change</button>
                </div>
                <h3>Total of Lunies</h3>
                <h3>200</h3>
                <button className={styles.cancelBtn}>Cancel Reservation</button>
                <h4>Booking Review</h4>
                <p>Review the host to help the community</p>
                <form>
                    <textarea>

                    </textarea>
                    <div>
                        <button className={styles.sendReviewBtn}> Submit Review</button>
                    </div>
                </form>
            </div>
            <div className={styles.secondHalf}>
                <div className={styles.peopleContainer}>
                    <div className={styles.host}>
                        <h3>The Host</h3>
                        <UserCard type={'booking'}/>
                    </div>
                    <div className={styles.requester}>
                        <h3>The Requester</h3>
                        <UserCard type={'booking'}/>
                    </div>
                </div>
                <div>
                    <h3>Pets for This Reservation:</h3>
                    <FullPetCard/>
                </div>
                <div>
                    <h3>Booking Address</h3>
                    <p>Tilanusstrtaat 34b</p>
                    <div className={styles.mapContainer}>

                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Booking
