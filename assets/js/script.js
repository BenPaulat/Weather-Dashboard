// VARIABLES
var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');
var searchHistoryEl = document.querySelector('#city-history');
var weatherCardContainerEl = document.querySelector('#weather-container');
var weatherCardArr = [];
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
        cityNameBtn.setAttribute('onClick', 'searchSubmitHandler(cityNameBtn.innerText)');
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
        console.log(city);
        getWeatherData(city);

        // store city in local storage
        historyArr.push(city);
        localStorage.setItem('cityName', JSON.stringify(historyArr));
        
        // display history
        displaySearchHistory(city);

        // clear old content
        searchHistoryEl.textContent = "";
        cityInputEl.value = "";


    } else if (!city) {
        alert("Please enter a city");
    }
};

// fetch function for city search data
function getWeatherData(city) {
    let currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(currentWeatherAPI)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        handleWeatherData(data);
    })
        .catch(function (error) {
            alert("Unable to connect to Weather API");
        });
    };

// function to parse search results
function handleWeatherData(res) {
    console.log(res);

    let fiveDayForcastObj = {
        day0: {},
        day1: {},
        day2: {},
        day3: {},
        day4: {},
        day5: {},
    };
    for (let i = 0; i < 6; i++) {
        fiveDayForcastObj[`day${i}`].name = res.city.name;
        const convF = (res.list[i].main.temp - 273.15) * 1.8 + 32;
        fiveDayForcastObj[`day${i}`].temperature = convF.toFixed(1);
        fiveDayForcastObj[`day${i}`].humidity = res.list[0].main.humidity;
        fiveDayForcastObj[`day${i}`].windspeed = res.list[0].wind.speed;
        fiveDayForcastObj[`day${i}`].coordinates = res.city.coord;
    }
    displayWeatherData(fiveDayForcastObj);
}

function displayWeatherData(objArr) {
    const day = new Date(currentDate);
    
    for (let i = 0; i < objArr.length; i++) {
        day.setDate(currentDate.getDate() + i);
        const temp = cityData[`day${i}`].temperature;
        const humidity = cityData[`day${i}`].humidity;
        weatherCardContainerEl += `
        <div class="card" style="width: 9rem;">
            <div class="card-body">
                <div class="card-title">
                    ${day.toLocaleDateString()}
                </div>
                <div class="card-text">
                    Temp: ${temp} °F
                </div>
                <div class="card-text">
                    Humidity: ${humidity}%
                </div>
            </div>
        </div>`;
        
    }
        
    // loop over array of weather data and push to containter
    // for (var i = 0; i < objArr.length; i++) {
    //     let weatherCardEl = document.createElement('div');
    //     weatherCardEl.classList.add('card');
    //     weatherCardContainerEl.append(weatherCardEl[i])
    // }

}

searchFormEl.addEventListener("submit", searchSubmitHandler);