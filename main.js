const input = document.querySelector('input')
const searchBtn = document.querySelector('.searchBtn')
const displayCity = document.querySelector('.city')
const displayForecast = document.querySelector('.forecast')
const displayTemp = document.querySelector('.temp')
const displayIcon = document.querySelector('.display-icon')
const displayTime = document.querySelector('.time')
const displayHumidity = document.querySelector('.humidity')
const displayRain = document.querySelector('.chance-rain')
const displayWind = document.querySelector('.wind-speed')

searchBtn.addEventListener('click', fetchWeather)

async function fetchWeather() {
    const city = input.value.toLowerCase();
    console.log(city);
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=3767319680b2479f8c665244232804&q=${city}&days=1&aqi=no&alerts=no`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Network request not ok');
        }
        const city = data.location.name
        const temperature = data.current.temp_c
        const forecast = data.current.condition.text
        const time = data.location.localtime
        const humidity = data.current.humidity 
        const rain = data.forecast.forecastday[0].day.daily_chance_of_rain
        const wind = data.current.gust_kph


        updateWeather(city, temperature, forecast, time, humidity, rain, wind)
        updateIcon(forecast)
    } catch (err) {
        console.log(err);
    }
}

const updateWeather = (city, temp, fc, time, humid, rain, wind) => {
    displayCity.textContent = city
    displayTemp.innerHTML = temp + '<span>&#8451;</span>' // adding celcius symbol to end of temp
    displayForecast.textContent = fc
    displayTime.textContent = time
    displayHumidity.textContent = `Humidity: ${humid}%`
    displayRain.innerHTML = `Chance of rain: ${rain}%`
    displayWind.innerHTML = `Wind Speed: ${wind} km/h`
}

const updateIcon = (conditon) => {
    conditon = conditon.toLowerCase()

    if(conditon.includes('sunny')){
        displayIcon.innerHTML = 'sunny'
    }else if(conditon.includes('clear')){
        displayIcon.innerHTML = 'clear_night'
    }else if(conditon.includes('cloudy') || conditon.includes('overcast')){
        displayIcon.innerHTML = 'cloudy'
    }else if(conditon.includes('mist')){
        displayIcon.innerHTML = 'mist'
    }else if(conditon.includes('rain')){
        displayIcon.innerHTML = 'rainy'
    }else if(conditon.includes('snow')){
        displayIcon.innerHTML = 'weather_snowy'
    }else if(conditon.includes('fog')){
        displayIcon.innerHTML = 'foggy'
    }else if(conditon.includes('thunder')){
        displayIcon.innerHTML = 'thunderstorm'
    }
}