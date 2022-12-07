import { WeatherData } from './data/WeatherData.js';
import { WeatherWidget } from './views/WeatherWidget.js';

// Get the user's current location and create a new Weather data object
navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const weather = await WeatherData.get(position.coords.latitude, position.coords.longitude);
    // Create a new WeatherView and render it to the page
    const weatherView = new WeatherWidget(weather);
    weatherView.render();
  } catch (e) {
    document.getElementById('weather').innerHTML = `<span class='error'>${e.message}</span>`;
  }
});
