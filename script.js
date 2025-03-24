const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        displayErrorMessage('Please enter a city name');
    }
});

function fetchWeatherData(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                displayErrorMessage('City not found');
            } else {
                displayWeatherData(data);
            }
        })
        .catch(error => displayErrorMessage('Error fetching weather data'));
}

function displayWeatherData(data) {
    const weather = data.weather[0];
    cityName.textContent = data.name;
    weatherDescription.textContent = weather.description;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    errorMessage.textContent = '';
}

function displayErrorMessage(message) {
    errorMessage.textContent = message;
}
