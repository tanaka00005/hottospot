import { useEffect, useState } from "react";
import CurrentLocateion from "../components/albumMap/AlbumMap";
import AlbumMap from "../components/albumMap/AlbumMap";

function Map() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <AlbumMap latitude={position.latitude} longitude={position.longitude} />
    </div>
  );
}

export default Map;