//file: api/controllers/weatherController.js

const fetch = require('node-fetch');
const recommendActivities = require('../services/recommendActivities.js');
const cityLookup = require('../data/cityLookup.js');

const weatherController = {
  getWeather: async (req, res) => {
    try {
      const { city, fromDay = 0, toDay = 2, activities } = req.query;
      const { lat, lon } = cityLookup[city];
      const apiKey = res.locals.apiKey;

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`);
      const weatherData = await weatherResponse.json();

      const processedData = processData(weatherData, fromDay, toDay);
      const recommendationsData = recommendActivities(processedData, activities || [], userSelected);

      res.status(200).json(recommendationsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
  }
};

function processData(data, fromDay, toDay) {
  // Your data processing logic here
  // ...

  return processedData;
}

module.exports = weatherController;
