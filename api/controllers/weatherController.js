const processData = require('../utils/processData.js');
const cityLookup = require('../utils/cityLookup.js');
const activities = require('../utils/activities.js');

const recommendActivities = require('../services/recommendActivities.js');

const weatherController = {
  getWeather: (req, res) => {
    let city = req.query.city;

    let fromDay = req.query.fromDay // === undefined ? 0 : req.query.fromDay;
    let toDay = req.query.toDay // === undefined ? 2 : req.query.toDay;

    let lat = cityLookup[city].lat;
    let lon = cityLookup[city].lon;
    let userSelected = req.query.activities === undefined ? [] : req.query.activities.split(",")
    const apiKey = res.locals.apiKey;

    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => processData(data, fromDay, toDay))
      .then(processedData => recommendActivities(processedData, activities, userSelected))
      .then(recommendationsData => res.status(200).json(recommendationsData))
  }
};

module.exports = weatherController;
