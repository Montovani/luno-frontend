import { useState } from 'react'
import styles from './Signup.module.css'
import { dutchCities } from '../data/cities'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [city, setCity] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

  const handleSubmit = async(e) => {
    try {
    e.preventDefault()
    const userBody = {
      name,
      city,
      email,
      password
    }
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,userBody)
      setName('')
      setCity('')
      setEmail('')
      setPassword('')
      navigate('/login')
    } catch (error) {
      console.log(error)
      if(error.response && error.response.status === 400){
        setIsError(true)
      }
      setErrorMessage(error.response.data.errorMessage)
    }
  }
  console.log(city)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <div className={styles.emoji}>🐶</div>

        <h1 className={styles.title}>Join the community!</h1>
        <p className={styles.subtitle}>
          Create your account and start caring for your furry friend
        </p>

        <form className={styles.formContainer} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>City</label>

            <select
              className={styles.select}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select a city</option>

              {dutchCities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>

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
            Create Account
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link to='/login'>
            Log in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup
