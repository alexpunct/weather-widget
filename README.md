# Weather widget

![image](https://user-images.githubusercontent.com/1785958/206202052-dfe77ed8-60df-4256-8693-4e01de6dfc53.png)


Simple weather widget with HTML, Javascript and SCSS to display local weather conditions. 
Uses data from https://openweathermap.org so make sure you get a free API key first.

### Running 

Simply add the folder to the document root of your webserver and load the page in the browser by adding the `apikey` URL parameter with your openweathermap API key.

Example: https://alexpunct.github.io/weather-widget/?apikey=123456

### Developers

* Styling
  
Compile the `.scss` file in the `styles` folder using https://sass-lang.com/ 

* Testing

To run the tests, make sure you have node installed, then run `npm install` and then `npm test`
