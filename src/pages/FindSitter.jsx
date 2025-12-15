
import Search from "../components/Search/Search";
import styles from "./FindSitter.module.css"
import SitterList from "../components/SittersList/SitterList";
import SittersMap from "../components/SittersMap/SittersMap";
import { useEffect, useState } from "react";
import axios from "axios";
import { dutchCitiesCoordinates } from '../data/citiesCoordinates'
import { BarLoader } from "react-spinners";
const override = {
  display: "block",
  textAlign: 'center',
  margin: "30% auto",
  borderColor: "red",
};

function FindSitter() {
  const [search, setSearch] = useState(null)
  const [sitterList, setSitterList] = useState(null)
  const [ center, setCenter ] = useState(null)

  useEffect(()=>{
    getSitterApi()
  },[search])

  const getSitterApi = async()=>{
    if(!search){
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`)
      setSitterList(response.data)
      setCenter([52.3676, 4.9041])
    }else{
      const {city, petType} = search
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`,{
        params:{
          ...(city && {city}),
          ...(petType && {petsCategoryAllowed: petType})
        }
      })
      const filterCity = dutchCitiesCoordinates.find((city)=>{
          return city.name === search.city
        })
      setSitterList(response.data)
      setCenter(filterCity.center)
    }
  }
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
    <>
        <Search setSearch={setSearch} />
        <div className={styles.findSitter}>
        <header className={styles.fsHeader}>
            <h1>Find a Pet Sitter</h1>
            <p>Search, browse sitters, and view them on the map.</p>
        </header>

        <div className={styles.findSitterCard}>
            <SitterList sitterList={sitterList} />
            <SittersMap sitterList={sitterList} center={center}/>
        </div>
        </div>
    </>
  );
}

export default FindSitter;
