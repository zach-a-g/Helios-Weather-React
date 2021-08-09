import React, { useState } from "react";
import axios from "axios";

const Forecast = () => {
    const [zipcode, setZipcode] = useState("76008");
    const [weeklyWeather, setWeeklyWeather] = useState([]);
    const [forecastName, setForecastName] = useState("");
  
    const getWeeklyWeatherData = () => {
      axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=32.7004&lon=-97.6039&units=imperial&exclude=current,minutely,hourly&appid=180941f68139fba12f166dc35d9b688b`,
      })
        .then((response) => {
          console.log(response.data);  
          console.log(response.data.daily);
  
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
        <h3>Future Forecast</h3>
        <div>
            <input type="text" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
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
    </>
)
}
export default Forecast;