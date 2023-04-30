const input = document.querySelector('input')
const searchBtn = document.querySelector('.searchBtn')
const displayCity = document.querySelector('.city')
const displayForecast = document.querySelector('.forecast')
const displayTemp = document.querySelector('.temp')
const displayImg = document.querySelector('.display-img')
const displayCountry = document.createElement('span');

searchBtn.addEventListener('click', fetchWeather)


async function fetchWeather() {
    const city = input.value;
    console.log(city);
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=3767319680b2479f8c665244232804&q=${city}&days=1&aqi=no&alerts=no`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Network request not ok');
        }
        console.log(data);
        updateResults(data)
    } catch (err) {
        console.log(err);
    }
}

const updateResults = (data) => {
    displayImg.src =  `https:${data.current.condition.icon}`
    displayCity.innerHTML = data.location.name 
    displayCountry.innerHTML = ',' + data.location.country
    displayCity.append(displayCountry)
    checkWrap() // see if country has wrapped
    displayTemp.innerHTML = data.current.temp_c + '<span>&#8451;</span>' // adding celcius symbol to end of temp
    displayForecast.innerHTML = data.current.condition.text
    
}

function checkWrap(){
if (displayCountry.offsetTop > displayCity.offsetTop) {
    displayCountry.style.verticalAlign = 'baseline';
  } else {
    displayCountry.style.verticalAlign = 'top';
  }
}