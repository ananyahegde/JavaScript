const API_KEY = ""; // enter your API key from openweathermap

window.onload = function() {
  document.getElementById("cityInput").value = '';
}

function getWeatherInfo() {
  const city = document.getElementById("cityInput").value;
  const BASE_URL = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  if (!city) {
    alert("Please enter city name.");
  } else {
    fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") { // invalid input
        alert(data.message);
        return;
      } 

      humidity = data.main.humidity;
      temp_c = data.main.temp - 273.15;
      wind_ms = data.wind.speed;
      weather_condition =data.weather[0].description;

      // update the dom
      humidity_ele = document.querySelector(".humidity");
      temp_ele = document.querySelector(".temp");
      wind_speed_ele = document.querySelector(".wind_speed");
      condition_ele = document.querySelector(".condition");

      humidity_ele.textContent = `${humidity} %`;
      temp_ele.innerHTML = temp_c.toFixed(2) + " &deg;C";
      wind_speed_ele.textContent = `${wind_ms} m/s`;
      condition_ele.textContent = weather_condition; 

      const weatherContainer = document.querySelector(".weather-container");
      weatherContainer.style.opacity = 1;
      weatherContainer.style.visibility = "visible";
    })
    .catch((err) => {     // catch network failures
      alert("Something went wrong. Please try again.");
    });
  }
}
