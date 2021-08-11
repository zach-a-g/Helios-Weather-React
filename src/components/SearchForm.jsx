import React, { useState } from "react";
import axios from "axios";
import Map from './Map'

// API = 180941f68139fba12f166dc35d9b688b

const SearchForm = () => {
  const [zipcode, setZipcode] = useState("76008");
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("02d");
  const [speed, setSpeed] = useState("");
  const [gust, setGust] = useState("");
  const [feels_like, setFeels_Like] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lon, setLon] = useState("-97.6039");
  const [lat, setLat] = useState("32.7004");

  const getWeatherData = () => {
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
        setLon(response.data.coord.lon)
        setLat(response.data.coord.lat)
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [forecastName, setForecastName] = useState("");

  const getWeeklyWeatherData = () => {
    axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly&appid=180941f68139fba12f166dc35d9b688b`,
    })
        .then((response) => {
        console.log(response.data);  
        console.log(response.data);

        // Setting the weekly weather data in an array to map through in the render section
        setWeeklyWeather(response.data.daily);
        // setDailyAlerts(response.data.daily.alerts)
        setForecastName(response.data.daily.name);
        })
        .catch((error) => {
        console.log(error);
        });
  };

  // Converts the day data from numbers to day_name.day/month
  const _convertUnixtoDayofWeek=(d) => {
    let stamp = new Date(d * 1000);
    let day = stamp.toLocaleDateString('en-US', { weekday: 'long' });
    let dateNote = stamp.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
    return day + ' ' + dateNote;
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
                  getWeatherData();
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
                {/* <WeatherIcon name={icon} className="my-awesome-icon" /> */}
                <img id="currentIcon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icon" />
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
          <div>
            <h3>Future Forecast</h3>
            <input type="text" placeholder="Longitude" value={lon} onChange={(e) => setLon(e.target.value)} />
            <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
                  <button id="button1" onClick={() => {
                getWeeklyWeatherData();
            }}
            >
                7 Day Forecast
            </button>
            <br />
            <br />
            <h4>{forecastName}</h4>
            <ul id="weeklyUl">
              {weeklyWeather.length > 0 ? (
                  weeklyWeather.map((day, index) => (
                  <>
                  <li id="weeklyDetailsLi">
                      <p id="weeklyDetails" key={index}>
                      <strong>{_convertUnixtoDayofWeek(day.dt)}</strong>
                      <img id="weekIcons" src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Icons" onError={e => e.target.style.display = 'none'}/>
                      {Math.round(day.temp.day)}°<br />
                      {day.weather[0].description}
                      </p>
                  </li>
                  </>
                  ))
              ): <></>}
            </ul>
            <br />
          </div> 
        </div>  
      </div>
      
      <div id="container2">
        <div id="weatherCard">
          <div id="weatherNews">
            <h3>Alerts In Your Area</h3>
              <input type="text" placeholder="Search News" onChange={(e) => setZipcode(e.target.value)} />
              <button id="button1" onClick={() => {

              }}
              >
                Search News
              </button>
              <p id="dailyAlerts">The Texas Commission on Environmental Quality (TCEQ) has issued an Ozone Action Day for the Dallas-Fort Worth area for Tuseday, August 10, 2021.<br /><br />Atmospheric conditions are expected to be favorable for producing high levels of ozone air pollution in the Dallas-Fort Worth area on Monday.<br /> You can help prevent ozone pollution by sharing ride, walking, riding a bicycle, taking your lunch to work, avoiding drive-through lanes, conserving energy, and keeping your vehicle properly tuned. <br /><br />For more information on ozone: Ozone: The Facts (www.tceq.texas.gov/goto/ozonefacts) Air North Texas: (www.airnorthtexas.org) EPA Air Now (www.airnow.gov/index.cfm?action.local_state&STATEID=45&TAB=0) Take care of Texas (www.takecareoftexas.org) North Central Texas Council of Governments Air Quality (www.nctcog.org/trans/air/index.asp</p>
          </div>
        </div>
        <div id="weatherCard">
          <div id="weatherMap">
            <h3>Precipitation Radar</h3>
            <Map />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchForm;