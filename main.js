const input = document.querySelector('input')
const searchBtn = document.querySelector('.searchBtn')
const displayCity = document.querySelector('.city')
const displayForecast = document.querySelector('.forecast')
const displayTemp = document.querySelector('.temp')
const displayIcon = document.querySelector('.display-icon')
const displayDate = document.querySelector('.date')
const displayHumidity = document.querySelector('.humidity')
const displayRain = document.querySelector('.chance-rain')
const displayWind = document.querySelector('.wind-speed')
const displayError = document.querySelector('.req-error')




//on page load call api
window.addEventListener('load', function(){
    searchBtn.click()
})

searchBtn.addEventListener('click', fetchWeather)

// allow users to submit entry with enter
input.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        searchBtn.click()
    }
} )


async function fetchWeather(){
    
    if(!input.value){
        city = 'melbourne'
    }else{
        city = input.value.toLowerCase();
    }

    const URL = `https://api.weatherapi.com/v1/forecast.json?key=697663694b084055a9455117230505&q=${city}&days=1&aqi=no&alerts=no`

    try {
        const response = await fetch(URL, {mode: 'cors'});
        const data = await response.json();

        if (!response.ok) {
            displayError.style.display = 'block'
            displayError.textContent = 'City not found'
            throw new Error('Network request not ok');
        }else{
            displayError.textContent = ''
        }
        
        const city = data.location.name
        const temperature = data.current.temp_c
        const forecast = data.current.condition.text
        const date = data.location.localtime
        const humidity = data.current.humidity 
        const rain = data.forecast.forecastday[0].day.daily_chance_of_rain
        const wind = data.current.gust_kph 
        updateWeather(city, temperature, forecast, date, humidity, rain, wind)
        updateIcon(forecast)
    } catch (err) {
        console.log(err);
    }
}

const updateWeather = (city, temp, fc, date, humid, rain, wind) => {
    displayCity.textContent = city
    displayTemp.innerHTML = temp + '<span>&#8451;</span>' // adding celcius symbol to end of temp
    displayForecast.textContent = fc
    displayDate.textContent = date
    displayHumidity.textContent = `Humidity: ${humid}%`
    displayRain.innerHTML = `Chance of rain: ${rain}%`
    displayWind.innerHTML = `Wind: ${wind} km/h`
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