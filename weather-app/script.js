const apikey = "";

async function fetchData(url) {
    const response = await fetch(url, {
        origin: "cors"
    });

    return response.json();
}

async function getWeatherForLocation(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;


    const currentWeather = await fetchCurrentWeather(url);
    const forecast = await fetchForecast(currentWeather);

    // console.log('forecast: ', forecast);

    return forecast;
}

async function fetchCurrentWeather(url) {
    const data = await fetchData(url);
    // console.log('data: ', data);
    return {
        coord: data.coord,
        cityName: data.name
    };
}

async function fetchForecast(weatherInfo) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&exclude=hourly,minutely&units=metric&appid=${apikey}`;

    const data = await fetchData(url);

    const result = {
        city: weatherInfo.cityName,
        currentTemp: data.current.temp,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        daily: data.daily
    }

    return result;
}

async function displayWeather(weather) {
    const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const IMGPATH = "http://openweathermap.org/img/wn/";
    
    const weatherContainerElement = document.getElementById('weather-container');

    //weather
    const weatherElement = document.createElement('div');
    weatherElement.classList.add('weather');
    
    //currentWeather
    const currentWeatherElement = document.createElement('div');
    currentWeatherElement.classList.add('currentWeather');

    const h5Element = document.createElement('h5');
    h5Element.innerText = `${weather.city}`;

    // weatherState
    const weatherStateElement = document.createElement('div');
    weatherStateElement.classList.add('weatherState');

    const spanTempElement = document.createElement('span');
    spanTempElement.classList.add('temp');
    spanTempElement.innerText = `${Math.floor(weather.currentTemp)}˚`;
    
    const spanStateNameElement = document.createElement('span');
    spanStateNameElement.classList.add('stateName');
    spanStateNameElement.innerText = `${weather.description}`;

    weatherStateElement.appendChild(spanTempElement);
    weatherStateElement.appendChild(spanStateNameElement);

    //currentWeather - end of
    currentWeatherElement.appendChild(h5Element);
    currentWeatherElement.appendChild(weatherStateElement);

    //forecast
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast');

    //nextDay(s)
    weather.daily.forEach(day => {
        const nextDayElement = document.createElement('div');
        nextDayElement.classList.add('nextDay');

        const h4DayElement = document.createElement('h4');
        h4DayElement.innerText = `${weekDay[new Date(parseInt(day.dt + '000')).getDay()]}`;
        h4DayElement.classList.add('day');

        const h4TempElement = document.createElement('h4');
        h4TempElement.innerText = `${Math.floor(day.temp.day)}˚`;
        h4TempElement.classList.add('temp');

        const imgElement = document.createElement('img');
        imgElement.src = `${IMGPATH}/${day.weather[0].icon}.png`;
        
        nextDayElement.appendChild(h4DayElement);
        nextDayElement.appendChild(h4TempElement);
        nextDayElement.appendChild(imgElement);

        forecastElement.appendChild(nextDayElement);
    });
    
    weatherElement.appendChild(currentWeatherElement);
    weatherElement.appendChild(forecastElement);
    weatherContainerElement.appendChild(weatherElement);

}

// For debug purpose
// getWeatherForLocation('london').then((weather) => console.log('weather: ', weather));

getWeatherForLocation('london').then((weather) => displayWeather(weather));
getWeatherForLocation('paris').then((weather) => displayWeather(weather));
getWeatherForLocation('dubai').then((weather) => displayWeather(weather));