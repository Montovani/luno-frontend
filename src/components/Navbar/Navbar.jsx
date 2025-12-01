import { Link, useNavigate } from "react-router"
import Logo from "../../assets/images/Luno_Logo.png"
import styles from "./Navbar.module.css"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function Navbar() {
    const {authenticateUser, isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = ()=>{
        navigate('/login')
    }
    const handleSignup = ()=>{
        navigate('/signup')
    }
    const handleDashboard = ()=>{
        navigate('/dashboard')
    }
    const handleLogout = async()=>{
        localStorage.removeItem("authToken")

        try {
            await authenticateUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <nav className={styles.navContainer}>
        <div className={styles.imgContainer}>
            <img className={styles.imgStyle} src={Logo} alt="" />
        </div>
        <div className={styles.linksContainer}>
            <Link to="/">Home</Link>
            <Link to="/pet-sitter">Find a Sitter</Link>
            
        </div>
        <div className={styles.btnContainer}>
            
            {isLoggedIn? 
                <>
                    <button onClick={handleDashboard}>Dashboard</button>
                    <button onClick={handleLogout}>Logout</button>
                </> :
                <>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignup}>Try for free</button>
                </>
                }
            
        </div>
    </nav>
  )
}

export default Navbar
