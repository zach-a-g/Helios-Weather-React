import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchForm from './components/SearchForm';
import Profile from './components/UserProfile';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div id="loadingScreen">Loading...</div>

    return (
      <div className = "App">
        <NavBar />
        {/* <Profile /> */}
        {/* <h1>Helios</h1> */}
        <SearchForm />
      </div>
    );
}

export default App;