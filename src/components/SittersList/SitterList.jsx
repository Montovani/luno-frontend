import { useEffect, useState } from 'react'
import SitterCard from '../SitterCard/SitterCard'
import styles from './SitterList.module.css'
import axios from 'axios'
import { Link } from 'react-router'
import { BarLoader } from 'react-spinners'

const override = {
  display: "block",
  textAlign: 'center',
  margin: "30% auto",
  borderColor: "red",
};

function SitterList({sitterList}) {
  
if(!sitterList){
  return (
    <BarLoader
      color="#183F39"
      loading={true}
      cssOverride={override}
      size={35}
      aria-label="Loading"
      data-testid="loader"
    >
    </BarLoader>
  )
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
