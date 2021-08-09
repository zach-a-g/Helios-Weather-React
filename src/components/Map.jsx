import React, { useRef, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGdsZWVzb24iLCJhIjoiY2tzM3UwYnN0MmhnajJvbzdxMm9wamNwcyJ9.-jcEmnJfCo9VcVZDYgxghQ';

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-97.5964);
    const [lat, setLat] = useState(32.6871);
    const [zoom, setZoom] = useState(8.3);
      
    useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
    });
      
    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });

    // map.on ('load', () => {
    //     map.addSource('radar', {
    //     'type': 'image',
    //     'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
    //     'coordinates': [
    //     [-97.5964, 32.6871],
    //     ]
    //     });
    //     map.addLayer({
    //     id: 'radar-layer',
    //     'type': 'raster',
    //     'source': 'radar',
    //     'paint': {
    //     'raster-fade-duration': 0
    //     }
    //     });
    //     });

    return (
      <div className = "MapBox" >
        <div id="sidebarContainer">
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} <br /> Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    );
}

export default Map;