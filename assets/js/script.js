// VARIABLES
var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');

// API key
const apiKey = "59821731ddfaee6faca13d91cee4cbbc";
// OneCall API URL
var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclusions}&appid=${apiKey}`;
// Current Weather API URL
var currentWeatherAPI = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// Search submission handler
function searchSubmitHandler() {
    event.preventDefault();

    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getWeatherData(city);

        // clear old content
        weatherContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

// fetch function for city search data
function getWeatherData(city) {
    let currentWeatherAPI = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(currentWeatherAPI).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                parseResponse(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
        .catch(function (error) {
            alert("Unable to connect to Weather API");
        });
};

// generate array of previous search cities

// set local storage function for previous searches

// function to parse search results

// function to generate cards of weather data

searchFormEl.addEventListener("submit", searchSubmitHandler);