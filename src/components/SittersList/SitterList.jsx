import { useEffect, useState } from 'react'
import SitterCard from '../SitterCard/SitterCard'
import styles from './SitterList.module.css'
import axios from 'axios'

function SitterList({sitterList}) {
  
if(!sitterList){
    return <h3>Loading...</h3>
}
  return (
    <div className={styles.container}>
        {sitterList.map((sitter)=>{
          return <SitterCard key={sitter._id} name={sitter.name} petsCategoryAllowed={sitter.petsCategoryAllowed} mainProfilePhoto={sitter.mainProfilePhoto}  />
        })}
    </div>
  )
}

export default SitterList
