import { useEffect, useState } from 'react'
import SitterCard from '../SitterCard/SitterCard'
import styles from './SitterList.module.css'
import axios from 'axios'
import { Link } from 'react-router'

function SitterList({sitterList}) {
  
if(!sitterList){
    return <h3>Loading...</h3>
}
  return (
    <div className={styles.container}>
        {sitterList.map((sitter)=>{
          return <Link to ={`/profile/${sitter._id}`}><SitterCard key={sitter._id} name={sitter.name} petsCategoryAllowed={sitter.petsCategoryAllowed} mainProfilePhoto={sitter.mainProfilePhoto}  /></Link>
        })}
    </div>
  )
}

export default SitterList
