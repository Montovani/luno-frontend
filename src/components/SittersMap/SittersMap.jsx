import { useState, useEffect } from 'react'
import styles from './SittersMap.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useNavigate } from 'react-router'

// Componente auxiliar para atualizar o centro do mapa
function ChangeMapView({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

function SittersMap({sitterList, center}) {
  const navigate = useNavigate()
  console.log(center)
  
  return (
    <div className={styles.container}>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <ChangeMapView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* invoke Marker Componentes here */}
        {
            sitterList
            .filter((eachElement) => eachElement.coordinates !== null && eachElement.coordinates.length === 2)
            .map((eachElement) => {
              return (
                <Marker key={eachElement._id} position={eachElement.coordinates}>
                  <Popup>
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