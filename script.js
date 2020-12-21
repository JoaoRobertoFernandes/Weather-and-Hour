const Kelvin = 273;
const Key = "5fd719aedde620fdad6231f675e4076a";
var button = document.querySelector(".button")
var inputValue = document.querySelector(".inputValue")

/*----------Elements----------*/
const notificationElement = document.querySelector(".notification");
const tempElementC = document.querySelector(".weather-c");
const tempElementF = document.querySelector(".weather-f");
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
    tempElementC.innerHTML = `${weather.temperature.value}°C`;
    tempElementF.innerHTML = `${(weather.temperature.value * 9/5) + 32}°F`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}`;
}
/*----------Weather to UI----------*/


/*-----------Search----------*/

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+Key)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let temp = data['main']['temp'] + "°F";
        let fahrenheit = ((parseInt(temp)-273)*9/5)+32;
        let celsius = (parseInt(temp)-273);
        
        locationElement.innerHTML = data["name"];
        tempElementF.innerHTML = fahrenheit + "°F";
        tempElementC.innerHTML = celsius + "°C";
        descElement.innerHTML = data['weather'][0]['description'];
    })
.catch(err => alert("Wrong city name!"))
})
/*-----------Search----------*/




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



