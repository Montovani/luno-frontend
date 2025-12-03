import styles from './Booking.module.css'
import UserCard from "../components/UserCard/UserCard";
import FullPetCard from '../components/PetCard/FullPetCard';
import { useEffect, useState } from 'react';
import service from '../../services/config.services';
import { Link, useParams } from 'react-router';
import { capitalize } from '../utils/functions';
function Booking() {
    const [hostInfo, setHostInfo] = useState(null)
    const [requesterInfo, setRequesterInfo] = useState(null)
    const [pets, setPets] = useState(null)
    const [booking, setBooking] = useState(null)
    const {bookingId} = useParams()
    const [isreviewAllowed, setIsReviewAllowed] = useState()
    const [bookingStatus, setBookingStatus] = useState()


    useEffect(()=>{
        getBookingApiData()
    },[])
    const getBookingApiData = async()=>{
        try {
            const response = await service.get(`/booking/${bookingId}`)
            setBooking(response.data)
            setHostInfo(response.data.host)
            setRequesterInfo(response.data.requester)
            setPets(response.data.petCared)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    if(!hostInfo || !requesterInfo || !pets || !booking){
        return <h4>Loading...</h4>
    }
    console.log(pets)
  return (
    <div className={styles.bookingContainer}>
        <h3 className={styles.title}>Pet Sitting Book</h3>
        <section className={styles.section}>
            <div className={styles.firstHalf}>
                <h4>Date</h4>
                <div className={styles.dateContainer}>
                    <div>
                        <p>From</p>
                        <p>{booking.dateStart.split("T")[0]}</p>
                    </div>
                    <div>
                        <p style={{fontSize:'3rem'}}>&rsaquo;</p>
                    </div>
                    <div>
                        <p>Until</p>
                        <p>{booking.dateEnd.split("T")[0]}</p>
                    </div>
                </div>
                <h4>Status of Reservation </h4>
                <div className={styles.statusContainer}>
                    <p>{capitalize(booking.status)}</p>
                    <button>Change</button>
                </div>
                <h3>Total of Lunies</h3>
                <h3>{booking.lunies}</h3>
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
                        <Link to={`/profile/${hostInfo._id}`}>
                        <UserCard
                        type={'booking'}
                        name={hostInfo.name}
                        location={hostInfo.city}
                        avatar={hostInfo.avatar}/>
                        </Link>
                    </div>
                    <div className={styles.requester}>
                        <h3>The Requester</h3>
                        <Link to={`/profile/${requesterInfo._id}`}>
                        <UserCard type={'booking'} name={requesterInfo.name}
                        location={requesterInfo.city}
                        avatar={requesterInfo.avatar}/>
                        </Link>
                    </div>
                </div>
                <div>
                    <h3>Pets for This Reservation:</h3>
                    {pets.map((pet)=>{
                        return <FullPetCard pet={pet}/>
                    })}
                </div>
                <div>
                    <h3>Booking Address</h3>
                    <p>{hostInfo.address}</p>
                    <div className={styles.mapContainer}>
                    </div>
                    <h3>Message</h3>
                    <div className={styles.bookingMessage}>
                        <div className={styles.avatarMessage}>
                            <img style={{width:'100%', objectFit:'cover'}}src={requesterInfo.avatar} />
                        </div>
                        <p>{booking.message}</p>
                    </div>
                    <h3>Review</h3>
                    <div className={styles.bookingMessage}>
                        <div className={styles.avatarMessage}>
                            <img style={{width:'100%', objectFit:'cover'}}src={requesterInfo.avatar} />
                        </div>
                        <p>{booking.message}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Booking
