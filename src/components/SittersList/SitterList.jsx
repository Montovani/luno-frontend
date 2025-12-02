import SitterCard from '../SitterCard/SitterCard'
import styles from './SitterList.module.css'

function SitterList() {
  return (
    <div className={styles.container}>
        <SitterCard />
    </div>
  )
}

export default SitterList
