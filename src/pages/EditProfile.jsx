import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard/UserCard'
import UserDetailsCard from '../components/UserDetailsCard/UserDetailsCard'
import styles from './EditProfile.module.css'
import service from '../../services/config.services'
import EditProfileForm from '../components/EditProfileForm/EditProfileForm'
import { useNavigate } from 'react-router'

function EditProfile() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState()

    useEffect(()=>{
        getUserApiData()
    },[])

    const getUserApiData = async()=>{
        try {
            const response = await service.get('/user/dashboard')
            setUserInfo(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePetsBtn = ()=>{
        navigate('/edit-pets')
    }
    if(!userInfo){
        return <h3>Loading...</h3>
    }
  return (
    <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
            <button className='button'>User Information</button>
            <button onClick={handlePetsBtn} className='button'>Pets</button>
        </div>
        <h3>Current Information</h3>
        <UserDetailsCard userInfo={userInfo} />
        <h3>Edit Your Profile</h3>
        <EditProfileForm userInfo={userInfo} getUserApiData={getUserApiData}/>
    </div>
  )
}

export default EditProfile
