// Define the WeatherView class
export class WeatherWidget {
    // Constructor to initialize the weather view
    // Constructor to initialize the weather view
  constructor(weather) {
      this.weather = weather;
      this.toggle = "c";
    
      // Bind the event handler methods
      this.onToggle = this.onToggle.bind(this);

      // Get the DOM elements (We could potentially create them here instead for separation of concerns)
      this.loader = document.getElementById('loader');
      this.content = document.getElementById('content');

      this.cityEl = document.getElementById("city");
      this.tempEl = document.getElementById("temp");
    
      this.toggleEl = document.getElementById("toggle");
      this.toggleEl.addEventListener("click", this.onToggle);
    
      this.humidityEl = document.getElementById("humidity");
      this.windEl = document.getElementById("wind");
      this.sunriseEl = document.getElementById("sunrise");
      this.sunsetEl = document.getElementById("sunset");
  }
  
      // Method to update the weather view
  update() {
      this.cityEl.innerHTML = `${this.weather.city}, ${this.weather.country}`;

      // @TODO add different class based on conditions to have different graphics
    
      if (this.toggle === "c") {
        this.tempEl.innerHTML = `${this.weather.getCelsius().toFixed(1)}&deg;C`;
      } else {
        this.tempEl.innerHTML = `${this.weather.getFarenheit().toFixed(1)}&deg;F`;
      }
    
      this.humidityEl.innerHTML = `HUMIDITY: ${this.weather.humidity}%`;
      this.windEl.innerHTML = `WIND: ${this.weather.wind.toFixed(1)} M/S`;
    
      const sunrise = new Date(this.weather.sunrise * 1000);
      this.sunriseEl.innerHTML = `SUNRISE: ${sunrise.toLocaleTimeString()}`;
    
      const sunset = new Date(this.weather.sunset * 1000);
      this.sunsetEl.innerHTML = `SUNSET: ${sunset.toLocaleTimeString()}`;
    }
    
    // Event handler for the toggle button
    onToggle() {
      this.toggle = this.toggle === "c" ? "f" : "c";
      this.update();
    }
    
    // Method to render the weather view to the page
    render() {
      this.loader.style.display = 'none';
      this.content.style.display = 'block';
      this.update();
    }
  }

  export default {
    WeatherWidget,
  }
  