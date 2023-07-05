const processData = require('./processData.js');

const cityLookup = {
  'brighton': {
    "lat": 50.8214626,
    "lon": -0.1400561,
  },
  'lisbon': {
    "lat": 38.7077507,
    "lon": -9.1365919
  },
  'valencia': {
    "lat": 39.4697065,
    "lon": -0.3763353
  },
  'riga': {
    "lat": 56.9493977,
    "lon": 24.1051846
  },
  'santorini': {
    "lat": 36.4622122,
    "lon": 25.3757257
  }
}

const apiKey = 'f8a2fbf1b51fb5ad125f82f3708b1ad6'

const weatherController = {
  getWeather: (req, res) => {
    let city = req.body.city;
    let lat = cityLookup.city.lat;
    let lon = cityLookup.city.lon;

    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => processData(data))


    res.send("Hello World! ");
  },
};

module.exports = weatherController;
