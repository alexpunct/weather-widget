import { LocalStorage as Cache } from '../helpers/Cache.js';

// Weather API URL and API key
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = (new URL(window.location.href)).searchParams.get("apikey");

// Define the Weather class
export class WeatherData {
  // Constructor to initialize the weather data
  constructor(data) {
    this.city = data.name
    this.country = data.sys.country
    this.temp = data.main.temp
    this.humidity = data.main.humidity
    this.wind = data.wind.speed
    this.sunrise = data.sys.sunrise
    this.sunset = data.sys.sunset
  }

  // Method to get the weather data from the API
  static async get(lat, lon) {
    // Try to find the weather data in cache (not older than 30 secons)
    let cachedData = Cache.get('localWeatherData', 30000);

    // If we can't find it, we fetch it from the API and cache it
    if (!cachedData) {
      // Make a GET request to the API
      const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const data = await response.json();

      // If we have an error, return an error string
      if (data.cod !== 200) {
        throw new Error(
          data.cod === 401 ? `Missing 'apikey' URL parameter.<br />Get one for free at <a href="https://openweathermap.org" target="_blank">openweathermap.org</a>.` : data.message
        );
      }

      // Cache the data
      Cache.set('localWeatherData', data);
      cachedData = data;
    }

    // Return a new Weather object
    return new WeatherData(cachedData)
  }

  // Method to convert the temperature from Kelvin to Celsius
  getCelsius() {
    return this.temp - 273.15
  }

  // Method to convert the temperature from Kelvin to Farenheit
  getFarenheit() {
    return (this.temp * 9) / 5 - 459.67
  }
}

export default {
  WeatherData,
}
