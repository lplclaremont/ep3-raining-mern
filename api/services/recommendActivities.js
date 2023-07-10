//const activities = require('../utils/activities');

const recommendActivities = (processedWeatherData, activities, userSelected) => {
  let dailyArray = processedWeatherData.daily;

  userSelected.forEach((activity) => {
    activities[activity].chosen = true
  })

  dailyArray.sort((a, b) => {
    if (a.weather[0].id < b.weather[0].id) {
      return 1; // Move worse weather i.e. lower id to the end
    }
    if (a.weather[0].id > b.weather[0].id ) {
      return -1; // Move better weather i.e.  to the beginning
    }
    return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)
  });

  const orderedActivities = Object.entries(activities)
    .sort((a, b) => {
      if (a[1].chosen && !b[1].chosen) {
        return -1
      } else if (!a[1].chosen && b[1].chosen) {
        return 1
      } else {
        return 0
      }
    })
    .map(([activity]) => activity);

  dailyArray.forEach((day) => {
    const index = orderedActivities.findIndex(
      (activity) => activities[activity].optimalConditions.includes(day.weather[0].id)
    )
    day.activity = orderedActivities[index]
    orderedActivities.splice(index, 1);
  });

  dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)

  processedWeatherData.daily = dailyArray;

  // console.log(processedWeatherData);

  return processedWeatherData;
};

module.exports = recommendActivities;

