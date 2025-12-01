import Logo from '../assets/images/Luno_Logo.png'

const imgContainer = {
    width: "7rem",
    height: "auto"
}
const imgStyle = {
    width: "100%"
}

function Navbar() {
  return (
    <nav>
        <div style={imgContainer}>
            <img style={imgStyle} src={Logo} alt="" />
        </div>
        <div>

        </div>
        <div>
            <button>Signup</button>
        </div>
    </nav>
  )
}

export default Navbar
