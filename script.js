const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; 
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherIcon = document.getElementById('weather-icon');
const temperatureDisplay = document.getElementById('temperature');
const humidityDisplay = document.getElementById('humidity');
const descriptionDisplay = document.getElementById('description');
const errorMessageDisplay = document.getElementById('error-message');
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (data.cod === '404') {
            errorMessageDisplay.textContent = 'City not found';
            clearWeatherInfo();
        } else {
            errorMessageDisplay.textContent = '';
            displayWeatherData(data);
        }
    } catch (error) {
        errorMessageDisplay.textContent = 'An error occurred. Please try again.';
        clearWeatherInfo();
        console.error('Error fetching weather data:', error);
    }
}
function displayWeatherData(data) {
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    temperatureDisplay.textContent = `Temperature: ${temperature}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = `Description: ${description}`;
}
function clearWeatherInfo() {
    weatherIcon.innerHTML = '';
    temperatureDisplay.textContent = '';
    humidityDisplay.textContent = '';
    descriptionDisplay.textContent = '';
}
