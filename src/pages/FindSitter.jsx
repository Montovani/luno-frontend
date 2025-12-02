
import Search from "../components/Search/Search";
import styles from "./FindSitter.module.css"
import SitterList from "../components/SittersList/SitterList";
import SittersMap from "../components/SittersMap/SittersMap";
import { useEffect, useState } from "react";
import axios from "axios";


function FindSitter() {
  const [search, setSearch] = useState(null)
  const [sitterList, setSitterList] = useState(null)

  useEffect(()=>{
    getSitterApi()
  },[search])

  const getSitterApi = async()=>{
    if(!search){
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`)
      setSitterList(response.data)
    }else{
      const {city, petType} = search
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`,{
        params:{
          ...(city && {city}),
          ...(petType && {petsCategoryAllowed: petType})
        }
      })
      setSitterList(response.data)
    }
  }

  return (
    <>
        <Search setSearch={setSearch} />
        <div className={styles.findSitter}>
        <header className={styles.fsHeader}>
            <h1>Find a Pet Sitter</h1>
            <p>Search, browse sitters, and view them on the map.</p>
        </header>

        <div className={styles.findSitterCard}>
            <SitterList sitterList={sitterList} />
            <SittersMap />
        </div>
        </div>
    </>
  );
}

export default FindSitter;
