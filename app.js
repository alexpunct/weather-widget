import { WeatherData } from './data/weatherData.js';
import { WeatherWidget } from './views/weatherWidget.js';

// Get the user's current location and create a new Weather data object
navigator.geolocation.getCurrentPosition(async (position) => {
  const weather = await WeatherData.get(position.coords.latitude, position.coords.longitude);

  // If weather is a string it means we have an error
  if (typeof weather === 'string') {
    document.getElementById('weather').innerHTML = `<span class='error'>${weather}</span>`;
    return;
  }
  // Create a new WeatherView and render it to the page
  const weatherView = new WeatherWidget(weather);
  weatherView.render();
});
