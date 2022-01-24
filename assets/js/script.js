// VARIABLES
var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');
var searchHistoryEl = document.querySelector('#city-history');
var historyArr = [];

// API key
const apiKey = "59821731ddfaee6faca13d91cee4cbbc";

// Display City Search History
function displaySearchHistory() {
    // create list element
    let historyList = document.createElement('div');
    historyList.classList.add('card-body');
    // add history element to search history section
    searchHistoryEl.append(historyList)

    for (var i = 0; i < historyArr.length; i++) {
        var cityNameBtn = document.createElement('button');
        cityNameBtn.setAttribute('type', 'submit');
        cityNameBtn.setAttribute('onClick', searchSubmitHandler(cityNameBtn.innerText));
        cityNameBtn.classList.add('btn');
        cityNameBtn.innerText = `${historyArr[i]}`;
        searchHistoryEl.append(cityNameBtn);
    }
}

// Search submission handler
function searchSubmitHandler() {
    event.preventDefault();

    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getWeatherData(city);

        // store city in local storage
        historyArr.push(city);
        localStorage.setItem('cityName', JSON.stringify(historyArr));

        // clear old content
        weatherContainerEl.textContent = "";
        cityInputEl.value = "";

        // display history

    } else {
        alert("Please enter a city");
    }
};

// fetch function for city search data
function getWeatherData(city) {
    let currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(currentWeatherAPI).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeatherData(data);
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
function displayWeatherData(data) {
    console.log(data)
}

// function to generate cards of weather data
function createCards() {
    let weatherCard = document.createElement
}

searchFormEl.addEventListener("submit", searchSubmitHandler);