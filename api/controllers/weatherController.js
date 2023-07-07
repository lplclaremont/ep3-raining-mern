const processData = require('../utils/processData.js');
const cityLookup = require('../utils/cityLookup.js');
const activites = require('../utils/activities.js');

const recommendActivities = require('../services/recommendActivities.js');

const weatherController = {
  getWeather: (req, res) => {
    let city = req.query.city;
    let lat = cityLookup[city].lat;
    let lon = cityLookup[city].lon;
    const apiKey = res.locals.apiKey;

    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => processData(data))
      .then(processedData => recommendActivities(processedData, activites))
      .then(recommendationsData => res.status(200).json(recommendationsData))
  }
};

module.exports = weatherController;
