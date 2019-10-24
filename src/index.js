/*
 */
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lattitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "74024ce79be1c8b250c329721fb528ee";

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
}

function getTemperature(city) {
  let apiKey = "74024ce79be1c8b250c329721fb528ee";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getTemperature(searchInput.value);
}
/*
  {
    if (searchInput.value.lenght);
    let city = document.querySelector("#city-name");
    city.innerHTML = searchInput.value;
*/
//let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//let apiKey = "74024ce79be1c8b250c329721fb528ee";

function convertToCelsius() {
  let temperature = document.querySelector("#temperature");
  let link = document.querySelector("#celsius");
  link.classList.add("active");
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = 19;
}

function convertToFahrenheit() {
  let temperature = document.querySelector("#temperature");
  let link = document.querySelector("#fahrenheit");
  link.classList.add("active");
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = Math.round((19 + 9) / 5 + 32);
}

function updateDateTime() {
  let hourDisplay = document.querySelector("#current-time");
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekdayDisplay = document.querySelector("#week-day");
  let currentDay = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let weekday = weekdays[currentDay.getDay()];
  let dateDisplay = document.querySelector("#current-date");
  let date = new Date();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();

  hourDisplay.innerHTML = `${hours}:${minutes}`;
  weekdayDisplay.innerHTML = `${weekday}`;
  dateDisplay.innerHTML = `${year}.${month}.${day}`;
}

let searchForm = document.querySelector("#search-form");
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");

searchForm.addEventListener("submit", search);
celsiusLink.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);
convertToCelsius();
updateDateTime();
getTemperature("Lisbon");
