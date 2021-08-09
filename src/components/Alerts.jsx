// not completed yet


const getAlertsWeatherData = () => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=32.7004&lon=-97.6039&units=imperial&exclude=current,minutely,hourly,daily&appid=180941f68139fba12f166dc35d9b688b`,
    })
      .then((response) => {
        console.log(response.data);  
        console.log(response.data.daily);

        // Setting the weekly weather data in an array to map through in the render section
        setWeeklyWeather(response.data.daily);
        // setDailyAlerts(response.data.daily.alerts)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export default getAlertsWeatherData;