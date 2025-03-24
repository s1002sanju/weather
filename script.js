const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual API key

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { main, weather } = data;
    const temp = main.temp.toFixed(1);
    const humidity = main.humidity;
    const weatherCondition = weather[0].description;
    const icon = weather[0].icon;

    document.getElementById('weatherResult').innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Conditions: ${weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${weatherCondition}">
    `;
}
