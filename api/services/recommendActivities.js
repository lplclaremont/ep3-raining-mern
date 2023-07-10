
const recommendActivities = (processedWeatherData, activities, userSelectedActivities) => {
  let dailyArray = processedWeatherData.daily;
  // Update 'chosen' boolean on activities to reflect the user selection 
  userSelectedActivities.forEach((activity) => {
    activities[activity].chosen = true
  })
  console.log(userSelectedActivities)
  
  console.log(dailyArray)
  // Sort the weather from best - worst days
  //sortBestWeather(dailyArray)

  dailyArray.sort((a, b) => {
    if (a.weather[0].id < b.weather[0].id) {
      return 1; // Move worse weather i.e. lower id to the end
    }
    if (a.weather[0].id > b.weather[0].id ) {
      return -1; // Move better weather i.e.  to the beginning
    }
    return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)
  });

  // Get the user's selected activities to front of the list
  console.log(dailyArray)
  const prioritisedActivities = prioritiseUserSelection(activities)
  // Assign the best activity to best day
  console.log(prioritisedActivities)

  assignActivities(dailyArray, prioritisedActivities, activities)

  dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)
  processedWeatherData.daily = dailyArray; // Update daily array with new activity data

  return processedWeatherData;
};

// const sortBestWeather = (dailyArray) => {
//   dailyArray.sort((a, b) => {
//     if (a.weather[0].id < b.weather[0].id) {
//       return 1; // Move worse weather i.e. lower id to the end
//     }
//     if (a.weather[0].id > b.weather[0].id ) {
//       return -1; // Move better weather i.e.  to the beginning
//     }
//     return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)
//   });
// }

const prioritiseUserSelection = (activities) => {
  return Object.entries(activities)
    .filter((activity) => activity[1].chosen)
    .concat(Object.entries(activities)
    .filter((activity) => !activity[1].chosen))
    .map(([activity]) => activity);
}

const assignActivities = (dailyArray, prioritisedActivities, activities) => {
  dailyArray.forEach((day) => {
    const index = prioritisedActivities.findIndex(
      (activity) => activities[activity].optimalConditions.includes(day.weather[0].id)
    )
    day.activity = prioritisedActivities[index]
    prioritisedActivities.splice(index, 1);
  });
}

module.exports = recommendActivities;

