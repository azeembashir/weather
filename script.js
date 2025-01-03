const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "d67b322dfac2a6c88d3a51c654ce7ebd"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    const weather_data = await fetch(url);
    
    
    if (!weather_data.ok) {
      throw new Error("City not found or invalid API key");
    }
    
    const data = await weather_data.json();
    
    
    if (data.cod === 200) {
      weather_body.style.display = "block";
      location_not_found.style.display = "none";
      
    
      temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`; 
      description.innerHTML = data.weather[0].description;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind_speed.innerHTML = `${data.wind.speed} m/s`;
      
    
      const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      weather_img.src = weatherIcon;
    } else {
      location_not_found.style.display = "block";
      weather_body.style.display = "none";
    }
  } catch (error) {
    location_not_found.style.display = "block";
    weather_body.style.display = "none";
    console.error(error);
  }
}


searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});


inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = inputBox.value.trim();
    if (city) {
      checkWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});
