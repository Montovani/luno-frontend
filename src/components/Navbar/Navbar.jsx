import { Link, useNavigate } from "react-router"
import Logo from "../../assets/images/Luno_Logo.png"
import styles from "./Navbar.module.css"

function Navbar() {
    const navigate = useNavigate()
    const handleLogin = ()=>{
        navigate('/login')
    }
    const handleSignup = ()=>{
        navigate('/signup')
    }
  return (
    <nav className={styles.navContainer}>
        <div className={styles.imgContainer}>
            <img className={styles.imgStyle} src={Logo} alt="" />
        </div>
        <div className={styles.linksContainer}>
            <Link to="/">Home</Link>
            <Link to="/pet-sitter">Find a Sitter</Link>
            <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className={styles.btnContainer}>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Try for free</button>
        </div>
    </nav>
  )
}

export default Navbar
