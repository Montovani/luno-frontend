import styles from './UserDetailsCard.module.css'


function UserDetailsCard({userInfo}) {
    
    if(!userInfo){
        return <h3>Loading...</h3>
    }
  return (
    <div className={styles.userDetailsContainer}>
        <p>Name: {userInfo.name}</p>
        <p>City: {userInfo.city}</p>
        <p>About You:
            {userInfo.aboutUser? ` ${userInfo.aboutUser}`:' Please Add some Info about you to increase your  chances to pet sitting'}
        </p>
        <p>Pets Can Take Care:</p>
        {userInfo.petsCategoryAllowed.length>0?(
        <ul>
            {userInfo.petsCategoryAllowed.map((pet)=>{
                return (
                <li>{pet}</li>
                )
            })}
        </ul>
        ):
        <p>- Please, add the pets you can take care</p>}
    </div>
  )
}

export default UserDetailsCard
