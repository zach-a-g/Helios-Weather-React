import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchForm from './components/SearchForm';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import YoutubeEmbed from './components/Youtube';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGdsZWVzb24iLCJhIjoiY2tzM3UwYnN0MmhnajJvbzdxMm9wamNwcyJ9.-jcEmnJfCo9VcVZDYgxghQ';

function App() {
    const { isLoading } = useAuth0();

    if (isLoading) return <div id="loadingScreen">Loading...</div>

    return (
      <div className = "App" >
        <NavBar />
        <SearchForm />
        <YoutubeEmbed />
      </div>
    );
}

export default App;