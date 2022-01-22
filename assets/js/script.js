// VARIABLES
// API key
const apiKey = "59821731ddfaee6faca13d91cee4cbbc";
// OneCall API URL
var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclusions}&appid=${apiKey}`;
// exclusions
var exclusions = "";
// Latitude and Longitude variables
var lat = "";
var lon = "";
// Current Weather API URL
var currentWeatherAPI = `api.openweathermap.org/data/2.5/weather?q=${city},${stateCode}&appid=${apiKey}`;
// City and State variables
var city = "";
var stateCode = "";
