import axios from "axios";
import { createContext, useEffect, useState, CSSProperties } from "react";
import { BarLoader, ClipLoader, SyncLoader } from "react-spinners";

const override = {
  display: "block",
  textAlign: 'center',
  margin: "30% auto",
  borderColor: "red",
};

// Context Component
const AuthContext = createContext()

//Wrapper Component
function AuthWrapper(props){
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [isValidatingUser, setIsValidatingUser] = useState(true)

    const authenticateUser = async()=>{
        // calling BE to decrypt (/verify) the token to update the state
        setIsValidatingUser(true)
        try {
            
            const authToken = localStorage.getItem('authToken')
            
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,{
                headers:{
                    authorization:`Bearer ${authToken}`
                }
            })

            

            setIsLoggedIn(true)
            setLoggedUserId(response.data._id)
            setIsValidatingUser(false)

        } catch (error) {
            console.log(error)

            //Token not valid
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setIsValidatingUser(false)
        }
    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser
    }

    //We need to verify for all pages the token. This is the first component we control
    useEffect(()=>{
        authenticateUser()
    },[])

    if(isValidatingUser){
        //Most important loading effect
        return (
            
            <BarLoader
            color="#183F39"
            loading={true}
            cssOverride={override}
            size={35}
            aria-label="Loading"
            data-testid="loader"
            >
            </BarLoader>
        )
    }
    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}
