'use strict';
const KEY = `a5c96eecef480b0341694660ece71707`;
const APIURL = (location) => `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}`
const form = document.getElementById('form');
const search = document.getElementById('search');
const temp = document.querySelector('.temp');
const forecast = document.querySelector('.forecast');

async function getWeatherLocation(location) {
    const response = await fetch(APIURL(location));
    const locationData = await response.json();
    addWeather(locationData);
}

function addWeather(data) {
    const temperature = FtoC(data.main.temp);
    temp.innerText = `${temperature}`

    forecast.innerText = `${data.weather[0].main}`
}

function FtoC(temp) {
    return ((temp-32)*5/9).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = search.value;
    getWeatherLocation(loc);
})