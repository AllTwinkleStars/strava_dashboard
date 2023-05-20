import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import styles from '../../styles/activityDetails.module.css';
import polyline from 'polyline-encoded';

export default function Map(props) {
  const position = props.start_latlng;
  const polylineProp = props.polyline;

  console.log(position);
  console.log(polylineProp);

  if (!position || !polylineProp) {
    return null; // or return a fallback component/message if desired
  }

  const coordinates = polyline.decode(polylineProp);

  const fillOrangeOptions = { color: '#fc5200' };

  const startMarker = (
    <Marker position={position} icon={L.icon({ iconUrl: '/start-marker.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />
  );

  const endMarker = (
    <Marker position={coordinates[coordinates.length - 1]} icon={L.icon({ iconUrl: '/end-marker.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />
  );

  return (
    <div className={styles.MapContainer}>
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={fillOrangeOptions} positions={coordinates} />
        {startMarker}
        {endMarker}
      </MapContainer>
    </div>
  );
}
