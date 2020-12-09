const Kelvin = 273;
const Key = "5fd719aedde620fdad6231f675e4076a";

/*----------Elements----------*/
const notificationElement = document.querySelector(".notification");
const tempElement = document.querySelector(".weather");
const descElement = document.querySelector(".date");
const locationElement = document.querySelector(".city");
/*----------Elements----------*/

/*----------Data----------*/
const weather = {};

weather.temperature = {
    unit : "celsius"
}
/*----------Data----------*/

/*----------Geolocation----------*/
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
/*----------Geolocation----------*/

/*----------User's Position----------*/
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
/*----------User's Position----------*/

/*----------Issue with geolocation----------*/
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} 
    !</p>`;
}
/*----------Issue with geolocation----------*/

/*----------Weather----------*/
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;

    fetch(api)
    .then(function(response) {
        let data = response.json();
        return data;
    })
    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.city = data.name;
    })
    .then(function() {
        displayWeather();
    });
}
/*----------Weather----------*/

/*----------Weather to UI----------*/
function displayWeather() {
    tempElement.innerHTML = `${weather.temperature.value}°C`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}`;
}
/*----------Weather to UI----------*/

/*-----------Conversion----------*/
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}
/*-----------Conversion----------*/

/*-----------Click----------*/
tempElement.addEventListener("click", function() {
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°F`;
        weather.temperature.unit = "fahrenheit";
    }else {
        tempElement.innerHTML = `${weather.temperature.value}°C`;
        weather.temperature.unit = "celsius";
    }
});
/*-----------Click----------*/

/*-----------Clock----------*/
const hour = document.querySelector("[data-hour]");
const minutes = document.querySelector("[data-minutes]");



setInterval(setClock, 1000);

function setClock() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    hour.innerHTML = ` ${currentHour}:${currentMinutes} `;
}

/*-----------Clock----------*/



