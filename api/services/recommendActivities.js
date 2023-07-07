const activities = require('../utils/activities');

const recommendActivities = (processedWeatherData, activities) => {
  let dailyArray = processedWeatherData.daily;

  dailyArray.sort((a, b) => {
    if (a.weather[0].main === 'Rain' && b.weather[0].main !== 'Rain') {
      return 1; // Move rainy day to the end
    }
    if (a.weather[0].main !== 'Rain' && b.weather[0].main === 'Rain') {
      return -1; // Move non-rainy day to the beginning
    }
    return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)
  });

  const allActivities = Object.entries(activities)
    .sort((a, b) => a[1].ranking - b[1].ranking)
    .map(([activity]) => activity);

  dailyArray.forEach((day) => {
    if (day.weather[0].main !== 'Rain') {
      day.activity = allActivities.shift();
    } else {
      const indoorActivityIndex = allActivities.findIndex(
        (activity) => activities[activity].type === 'indoor'
      );
      day.activity = allActivities[indoorActivityIndex];
      allActivities.splice(indoorActivityIndex, 1);
    }
  });

  dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)

  processedWeatherData.daily = dailyArray;

  console.log(processedWeatherData);

  return processedWeatherData;
};

module.exports = recommendActivities;