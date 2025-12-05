import { useState } from 'react'
import styles from './SittersMap.module.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useNavigate } from 'react-router'



function SittersMap({sitterList}) {
  const [ center, setCenter ] = useState([52.3676, 4.9041])
  const navigate = useNavigate()

  return (
    
    <div className={styles.container}>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* invoke Marker Componentes here */}
        {
            sitterList.map((eachElement) => {
              return (
                <Marker position={eachElement.coordinates}>
                  <Popup>
                    {/* Example of the rest of the document data*/}
                    
                    <p>Name: <b>{eachElement.name}</b></p>
                    <button onClick={()=>navigate(`/profile/${eachElement._id}`)}>Profile</button>
                  </Popup>
                </Marker>
              )
            })
          }

      </MapContainer>

    </div>
  )
}

export default SittersMap
