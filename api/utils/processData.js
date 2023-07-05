const processData = (data) => {
  const processedData = {
    'lat': data.lat,
    'lon': data.lon,
    'daily': [
      {
        'dt': data.daily[0].dt,
        // and the rest...
      }, 
      {

      }, 
      {

      }, 
      {

      }, 
      {

      }
    ]
  }
  return processedData;
}

module.exports = processData;