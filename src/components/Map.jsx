import React, { useRef, useState } from 'react';
import ReactMapGL, {Layer} from 'react-map-gl';
const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 32.6871,
    longitude: -97.5964,
    zoom: 4,
  });

  const weatherLayer = {
    id: 'weather_map',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [
        'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=f0d031fea34fef25e67e799c05cd4fea',
      ],
      tileSize: 256,
    },
  };
  
    const mapContainer = useRef(null);

  return (
    <div className = "MapBox" >
      <ReactMapGL ref={mapContainer} className="map-container"
        {...viewport}
        onViewportChange={setViewport}
        width="95%"
        height="350px"
        mapboxApiAccessToken="pk.eyJ1IjoiemFjaGdsZWVzb24iLCJhIjoiY2tzM3UwYnN0MmhnajJvbzdxMm9wamNwcyJ9.-jcEmnJfCo9VcVZDYgxghQ"
      >
        <Layer {...weatherLayer} />
      </ReactMapGL>
    </div>
  );
}

export default Map;
