import styles from './Booking.module.css'
import UserCard from "../components/UserCard/UserCard";
import FullPetCard from '../components/PetCard/FullPetCard';
import { useEffect, useState } from 'react';
import service from '../../services/config.services';
import { Link, useParams } from 'react-router';
import { capitalize } from '../utils/functions';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function Booking() {
    // I can destructure booking to be better organized instead of having a bunch of states.
    const [hostInfo, setHostInfo] = useState(null)
    const [requesterInfo, setRequesterInfo] = useState(null)
    const [pets, setPets] = useState(null)
    const [booking, setBooking] = useState(null)
    const {bookingId} = useParams()
    const [isreviewAllowed, setIsReviewAllowed] = useState()
    const [bookingStatus, setBookingStatus] = useState()
    const [isStatusEditing, setIsStatusEditing] = useState(false)
    const [newStatus, setNewStatus] = useState(null)
    const {loggedUserId} = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState("")
    const [textReview, setTextReview] = useState("")
    const [stars, setStars] = useState(null)
    const[reviews, setReviews] = useState(null)
    const [ center, setCenter ] = useState(null)
   useEffect(()=>{
       getBookingApiData()
       getReviewApiData()
    },[])
    const getBookingApiData = async()=>{
        try {
            const response = await service.get(`/booking/${bookingId}`)
            setBooking(response.data)
            setHostInfo(response.data.host)
            setRequesterInfo(response.data.requester)
            setPets(response.data.petCared)
            setCenter(response.data.host.coordinates)
        } catch (error) {
            console.log(error) 
        }
    }
    const handleStatusChangeBtn = ()=>{
        setIsStatusEditing(true)
    }
    const getReviewApiData = async()=>{
        const response = await service.get(`/review/booking/${bookingId}`)
        
        setReviews(response.data)
    }
    console.log(reviews)
    const handleSaveNewStatus = async()=>{
        const body = {
            status: newStatus
        }
        try {
            await service.patch(`/booking/${bookingId}`,body)
            setIsStatusEditing(false)
            getBookingApiData()
        } catch (error) {
            console.log(error)
            setIsStatusEditing(false)
            setErrorMessage(error.response.data.errorMessage || "Something went wrong")
            setTimeout(()=>{
                setErrorMessage("")
            },3000)
            
        }
    }
    const handleCancelBtn = async() => {
    const statusToSend = 'canceled';
    setNewStatus(statusToSend);
    
    try {
        await service.patch(`/booking/${bookingId}`, {
        status: statusToSend
        });
        getBookingApiData();
    } catch (error) {
        console.log(error);
        setIsStatusEditing(false);
        setErrorMessage(error.response?.data?.errorMessage || "Something went wrong");
        setTimeout(() => {
        setErrorMessage("");
        }, 3000);
    }
    }
    const handleCreateNewReview = async()=>{
        try {
            const body = {
                text: textReview,
                stars,
                bookSitting: bookingId
            }
            await service.post('/review',body)
            getBookingApiData()
        } catch (error) {
            console.log(error)
        }
    }
    if(!hostInfo || !requesterInfo || !pets || !booking){
        return <h4>Loading...</h4>
    }
    const isLoggedHost = (loggedUserId === hostInfo._id)
    const isLoggedRequester = (loggedUserId === requesterInfo._id)
    console.log(reviews)
    console.log(hostInfo)
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
                {isStatusEditing?
                (
                    <>
                    <select className={styles.changeStatus}  value={newStatus} onChange={(e)=>setNewStatus(e.target.value)} >
                        {isLoggedHost &&
                        <>
                        <option value="select">Select</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in progress">In Progress</option>
                        </> 
                        }
                        {isLoggedRequester &&
                        <>
                        <option value="select">Select</option>
                        <option value="completed">Completed</option>
                        </>
                        }
                    </select>
                    <button onClick={handleSaveNewStatus}>Save new Status</button>
                    <div>

                    </div>
                    </>
                ):(
                <div className={styles.statusContainer}>
                    <p>{capitalize(booking.status)}</p>
                    <button onClick={handleStatusChangeBtn}>Change</button>
                </div>
                )}
                {errorMessage &&
                    <p className={styles.errorBox}>{errorMessage}</p>
                }
                <h3>Total of Lunies</h3>
                <h3>{booking.lunies}</h3>
                <button onClick={handleCancelBtn} className={styles.cancelBtn}>Cancel Reservation</button>
                {booking.status === 'completed' && isLoggedRequester && !reviews.length>0? (
                    <>
                    <h4>Booking Review</h4>
                    <p>Review the host to help the community</p>
                    <form>
                        <textarea
                        value={textReview}
                        onChange={(e)=>setTextReview(e.target.value)}>

                        </textarea>
                        <div>
                            <p>Stars:</p>
                            <select className={styles.changeStatus} value={stars} onChange={(e)=>setStars(Number(e.target.value))}>
                                <option value="0">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <button onClick={handleCreateNewReview} className={styles.sendReviewBtn}> Submit Review</button>
                        </div>
                    </form>                    
                    </>

                ):null}
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
                        <MapContainer center={center} zoom={14} scrollWheelZoom={false}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                    
                            <Marker position={hostInfo.coordinates}></Marker>
                        </MapContainer>
                    </div>
                    <h3>Message</h3>
                    <div className={styles.bookingMessage}>
                        <div className={styles.avatarMessage}>
                            <img style={{width:'100%', objectFit:'cover'}}src={requesterInfo.avatar} />
                        </div>
                        <p>{booking.message}</p>
                    </div>
                    <h3>Review</h3>
                    {reviews.length>0? (
                        <div className={styles.bookingMessage}>
                            <div className={styles.avatarMessage}>
                                <img style={{width:'100%', objectFit:'cover'}}src={requesterInfo.avatar} />
                            </div>
                            <p>{reviews[0]?.text}</p>
                        </div>
                    ):<p>You must complete the booking to create a review</p>}
                </div>
            </div>
        </section>
    </div>
  )
}

export default Booking
