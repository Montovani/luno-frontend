import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate, useNavigate } from "react-router"

function Private(props) {

    const {isLoggedIn} = useContext(AuthContext)
    if(isLoggedIn){
        //render the private page
        return props.children
    } else {
        return <Navigate to='/login'/>
    }
}

export default Private
