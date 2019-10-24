function getDate() {
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;
}

function getTime() {
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${hour}:${minute}`;
}

function convertToCelsius() {
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheit = currentTemp.innerHTML;
  let celsius = Math.round((fahrenheit - 32) * (5 / 9));

  let celsiusLink = document.querySelector("#convertToC");
  let fahrenheitlink = document.querySelector("#convertToF");
  celsiusLink.classList.add("active");
  fahrenheitlink.classList.remove("active");

  currentTemp.innerHTML = celsius;
}

function convertToFahrenheit() {
  let currentTemp = document.querySelector("#current-temp");
  let celsius = currentTemp.innerHTML;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);

  let fahrenheitlink = document.querySelector("#convertToF");
  let celsiusLink = document.querySelector("#convertToC");
  fahrenheitlink.classList.add("active");
  celsiusLink.classList.remove("active");

  currentTemp.innerHTML = fahrenheit;
}

function getTemperature(temperature) {
  let celsiusLink = document.querySelector("#convertToC");
  let fahrenheitLink = document.querySelector("#convertToF");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displaySearchResults(response) {
  let location = response.data.name;
  let h1 = document.querySelector("h1");

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");

  h1.innerHTML = `${location}`;
  currentTemperature.innerHTML = temperature;
  getTemperature(temperature);
}

function findWeather(locationName) {
  let location = locationName;
  /////////////INPUT ERROR HANDLING//////////////////////////////////////////////
  if (location.trim() === "") {
    alert("Please enter a valid location.");
  } else {
    let units = "metric";
    let apiKey = "75a21bee5cae9bb0d2bc680304e5f690";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displaySearchResults);
  }
}

function search(event) {
  event.preventDefault();
  let location = searchInput.value;
  findWeather(location);
}

////Current Location

function showLocalTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let location = response.data.name;
  let h1 = document.querySelector("h1");
  let currentTemperature = document.querySelector("#current-temp");
  let humidityPercentage = response.data.main.humidity;
  console.log(response.data);
  console.log("humidity", humidityPercentage);
  let humidity = document.querySelector("#humidity");
  //   let precipitation = document.querySelector("#precipitation")
  h1.innerHTML = location;
  currentTemperature.innerHTML = temperature;
  humidity.innerHTML = `${humidityPercentage}%`;
}

function getLocalTemperature(lat, lon) {
  let apiKey = "75a21bee5cae9bb0d2bc680304e5f690";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getLocalTemperature(latitude, longitude);
}

function findPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayWeather(event) {
  event.preventDefault();
  findPosition();
}

/////////////////////////////////////////////////////////////////////////

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let now = new Date();
let day = weekDays[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let searchForm = document.querySelector("#searchForm");
let searchInput = document.querySelector("#searchInput");

let btnLocalWeather = document.querySelector("#local-weather");

let celsiusLink = document.querySelector("#convertToC");
let fahrenheitLink = document.querySelector("#convertToF");

searchForm.addEventListener("submit", search);
btnLocalWeather.addEventListener("click", displayWeather);
celsiusLink.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// findPosition();
findWeather("Lisbon");
getDate();
getTime();
