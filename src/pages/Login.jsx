import { useContext, useState } from 'react'
import styles from './Login.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../context/auth.context'


function Login() {

    const {authenticateUser} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

  const handleSubmit = async(e) => {
    setErrorMessage('')
    setIsError(false)
    e.preventDefault()
    const userBody = {
      email,
      password
    }
    try {
    
      const response = await axios.post('http://localhost:5005/api/auth/login',userBody)
      
      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser()
    
      setEmail('')
      setPassword('')
      navigate('/dashboard')
    } catch (error) {
      if(error.response && error.response.status === 401){
        setIsError(true)
        setErrorMessage(error.response.data.errorMessage)
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <div className={styles.emoji}>🐶</div>

        <h1 className={styles.title}>Welcome back!</h1>
        <p className={styles.subtitle}>
          Provide your Email and Password to Login
        </p>

        <form className={styles.formContainer} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className={styles.input}
            />
          </div>
              {isError? <p className={styles.errorBox}>{errorMessage}</p>:null}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <Link to='/signup'>
            Signup
          </Link>
        </p>

      </div>
    </div>
  )

}

export default Login
