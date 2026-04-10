import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerRed from '../../assets/marker-red.png';
import markerBlue from '../../assets/marker-blue.png';
import './styles/Mapa.css';

let DefaultIcon = L.icon({
  iconUrl: markerBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

let UserIcon = L.icon({
  iconUrl: markerRed,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapEvents = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300); 

    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 15, { animate: true });
    }
  }, [lat, lng, map]);

  return null;
};

interface MapaProps {
  userLocation: { 
    lat: number; 
    lng: number
  } | null;
  places?: any[];
}

const Mapa: React.FC<MapaProps> = ({ userLocation, places }) => {
  const defaultCenter: [number, number] = [31.5513, -106.3554];
  const center = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter;
  return (
    <div className="mapa-container">
      <MapContainer 
        className="mapa" 
        zoom={14}
        center={center as [number, number]}  
        scrollWheelZoom={false} 
        preferCanvas={true}>
        <TileLayer
          url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CartoDB'/>

        {/* Mi ubucacion */
          userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={UserIcon}>
              <Popup>
                <div className="user-location">
                  <strong>Tu</strong> <br />
                  Tu ubicación detectada.
                </div>
              </Popup>
            </Marker>
          )
        }

        {/* Lugares Cercanos */
          places?.map((place) => (
            <Marker 
              key={place.fsq_place_id} 
              position={[place.latitude, place.longitude]}>
              <Popup>
                <div className="places-popup">
                  <strong>{place.name}</strong> <br/>
                  <span>
                    {place.location.address || "Sector " + place.location.locality}
                  </span>
                  <hr style={{ margin: '5px 0' }} />
                  <div className="places-distance">
                    <span>{place.distance} metros</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))
        }

        <MapEvents lat={center[0]} lng={center[1]} />
      </MapContainer>
    </div>
  );
};

export default Mapa;