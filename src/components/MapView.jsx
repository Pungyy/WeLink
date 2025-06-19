import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const violetIcon = new L.Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-violet.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const geocodeAdresse = async (adresse) => {
  if (!adresse) return null;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adresse)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.length === 0) return null;
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

function CustomAttribution() {
  const map = useMap();

  useEffect(() => {
    const attributionControl = L.control.attribution({
      position: 'bottomleft',
      prefix: false,
    });

    attributionControl.addAttribution(
      `<div style="
        background: rgba(255 255 255 / 0.85);
        color: #6b21a8; /* violet prune foncé */
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 12px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 2px 6px rgba(107,33,168,0.15);
        user-select: none;
      ">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" style="color:#22c55e; text-decoration:none;">OpenStreetMap</a> contributors &nbsp;|&nbsp; 
        © <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer" style="color:#6b21a8; text-decoration:none;">CARTO</a>
      </div>`
    );

    attributionControl.addTo(map);

    return () => {
      map.removeControl(attributionControl);
    };
  }, [map]);

  return null;
}

export default function MapView({ adresse }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    geocodeAdresse(adresse).then(setPosition);
  }, [adresse]);

  if (!position)
    return (
      <p className="text-sm text-gray-500 mt-2">
        Localisation introuvable ou en cours de chargement...
      </p>
    );

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: '250px',
        width: '100%',
        borderRadius: '1rem',
        marginTop: '1rem',
        boxShadow: '0 4px 15px rgba(107,33,168,0.25)', // violet prune clair
      }}
      attributionControl={false}
      className=""
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[position.lat, position.lng]} icon={violetIcon}>
        <Popup>{adresse}</Popup>
      </Marker>
      <CustomAttribution />
    </MapContainer>
  );
}
