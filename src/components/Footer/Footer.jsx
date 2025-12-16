import styles from "./Footer.module.css"
import Logo from "../../assets/images/Luno_Logo_White.png"
import GithubLogo from "../../assets/images/Github-Mark-White.png"

function Footer() {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.imgContainer}>
            <img src={Logo} alt="Luno logo" />
        </div>
        <div className={styles.textContainer}>
            <p>Made by <a style={{color:'white',textDecoration:'underline'}} href="https://www.linkedin.com/in/igor-montovani-frontend-developer/">Igor Montovani</a>. Check the project on</p>
            <div className={styles.githubImgContainer}>
                <a href="https://github.com/Montovani/luno-frontend"><img src={GithubLogo} alt="Github Logo" /></a>
            </div>
        </div>
        <div>
            <a style={{color: 'white'}} href="">About us</a>
        </div>
    </div>
  )
}

export default Footer