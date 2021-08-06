import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import WeatherIcon from 'react-open-weather-icons';

// API = 180941f68139fba12f166dc35d9b688b

const SearchForm = () => {
  const [zipcode, setZipcode] = useState("76008");
  const [name, setName] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");

  const [icon, setIcon] = useState("");

  const [speed, setSpeed] = useState("");
  const [gust, setGust] = useState("");
  const [feels_like, setFeels_Like] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  // Icon url = http://openweathermap.org/img/wn/{insert number here}@2x.png

  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=180941f68139fba12f166dc35d9b688b`,
    })
      .then((response) => {
        console.log(response.data);  
        console.log(response.data.main.temp);

        // Kelvin to Fahrenheit
        setTemperature((response.data.main.temp - 273.15) * 1.8 + 32);
        
        setDescription(response.data.weather[0].main);

        setIcon(response.data.weather[0].icon);

        setGust(response.data.wind.gust);
        setSpeed(response.data.wind.speed);
        setFeels_Like((response.data.main.feels_like - 273.15) * 1.8 + 32);
        setHumidity(response.data.main.humidity);
        setSunrise(response.data.sys.sunrise);
        setSunset(response.data.sys.sunset);
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Weekly weather variables
  const [dailyAlerts, setDailyAlerts] = useState(`{dailyAlerts}`);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [dailyIcon, setDailyIcon] = useState("");

  const getWeeklyWeatherData = (city, country) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=32.7004&lon=-97.6039&units=imperial&exclude=current,minutely,hourly&appid=180941f68139fba12f166dc35d9b688b`,
    })
      .then((response) => {
        console.log(response.data);  
        console.log(response.data.daily);

        // Setting the weekly weather data in an array to map through in the render section
        setWeeklyWeather(response.data.daily);
        setDailyIcon(response.data.daily.weather[0].icon)
        setDailyAlerts(response.data.daily.alerts)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
    <div id="mainContainer">
      <div id="container1">
        <div id="weatherCard">
          <h3>Current Weather</h3>
          <div>
              <input type="text" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
              {/* <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} /> */}
              <button id="button1" onClick={() => {
                  getWeatherData(city, country);
              }}
              >
              Get Weather Now
              </button>
              <br />
            {new Date().toLocaleString()}
            <br />
            <h4>{name}</h4>
            <div id="allDetails">
              <div id="tempBox">
                <WeatherIcon name={icon} className="my-awesome-icon" />
                <p id="weatherDetailsTemp">{Math.round(temperature)}°</p>
              </div>
              <div id="otherDetails">
              <p id="weatherDetails"><strong>Feels Like: </strong>{Math.round(feels_like)}°</p>
                
                <p id="weatherDetails"><strong>Sky Status:</strong> {description}</p>
                <p id="weatherDetails"><strong>Humidity: </strong>{humidity} %</p>
              
                <p id="weatherDetails"><strong>Wind Speed: </strong>{speed} mph</p>
                <p id="weatherDetails"><strong>Wind Gust: </strong>{gust} mph</p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div id="weatherCard"> 
        {/* @TODO move this into its own component */}
          <h3>Future Forecast</h3>
          <div>
              <input type="text" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
              <button id="button1" onClick={() => {
                  getWeeklyWeatherData(city, country);
              }}
              >
              7 Day Forecast
              </button>
            <br />
            <br />
              <h4>{name}</h4>
              <ul id="weeklyUl">
                {weeklyWeather.length > 0 ? (
                  weeklyWeather.map((day, index) => (
                  <>
                    <li id="weeklyDetails">
                      <p id="weeklyDetails" key={index}>
                        <WeatherIcon name={icon} className="my-awesome-icon" />
                        {Math.round(day.temp.day)}°<br />
                        {day.weather[0].description}</p>
                    </li>
                  </>
                  ))
                ): <></>}
              </ul>
              {/* <ul id="weeklyUl">
                {weeklyWeather.length > 0 ? (
                  weeklyWeather.map((day, index) => (
                  <li id="weeklyDetails" key={index}>{day.weather[0].description}</li>
                  ))
                ): <></>}
              </ul> */}
              <br />
            </div>
          </div>
        </div>
      
      <div id="container2">
        <div id="weatherCard">
          <div id="weatherNews">
            <h3>News</h3>
              <input type="text" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
              <button id="button1" onClick={() => {
                  getWeeklyWeatherData(city, country);
              }}
              >
                Search News
              </button>
              <p id="dailyAlerts">{dailyAlerts}</p>
          </div>
        </div>
        <div id="weatherCard">
          <div id="weatherMap">
            <h3>Map</h3>
          </div>
        </div>
        <div id="weatherCard">
          <div id="videoContainer">
            <h3>Storm Watch</h3>
          </div>
        </div>  
      </div>
    </div>
    </>
  );
};

export default SearchForm;