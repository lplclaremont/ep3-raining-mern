//file: api/services/recommendActivities.js


const recommendActivities = (processedWeatherData) => {
  let dailyArray = processedWeatherData.daily;

  const outdoorActivities = ["Beach", "Sightseeing", "Sports"];
  const indoorActivities = ["Museums", "Shopping", "Eating"];

  dailyArray.sort((a, b) => b.temp.day - a.temp.day);
  const rainyDays = dailyArray.filter((day) => day.weather[0].main === 'Rain');
  const nonRainyDays = dailyArray.filter((day) => day.weather[0].main !== 'Rain');

  nonRainyDays.forEach((day, index) => {
    day.activity = {
      name: outdoorActivities[index],
      description: `${day.temp.day} °C and sunshine, great day for ${outdoorActivities[index]}!`,
    };
  });

  rainyDays.forEach((day, index) => {
    day.activity = {
      name: indoorActivities[index],
      description: `${day.temp.day} °C and rainy, perfect for ${indoorActivities[index]}!`,
    };
  });
  
  dailyArray = nonRainyDays.concat(rainyDays);
  dailyArray.sort((a, b) => a.dt - b.dt);
  
  processedWeatherData.daily = dailyArray

  return processedWeatherData;
};

module.exports = recommendActivities;

//refactored to add a description, name properties to the 'day.activity' object
// for non-rainy= sunshine and rainy days=rainy
