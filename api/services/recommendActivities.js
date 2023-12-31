
const recommendActivities = (processedWeatherData, activities, userSelectedActivities) => {
  let dailyArray = processedWeatherData.daily;
  //initially set all 'chosen' boolean to false
  for (const activity in activities) {
    activities[activity].chosen = false;
  }
  // Update 'chosen' boolean on activities to reflect the user selection 
  userSelectedActivities.forEach((activity) => {
    activities[activity].chosen = true
  })

  dailyArray.sort((a, b) => {
    if (a.weather[0].id >= 800 && b.weather[0].id >= 800) {
      if (a.weather[0].id < b.weather[0].id) {
        return -1; // Move worse weather i.e. higher id to the end
      }
      if (a.weather[0].id > b.weather[0].id ) {
        return 1; // Move better weather i.e. lower id to the beginning
      }
      return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)

    } else {

      if (a.weather[0].id < b.weather[0].id) {
        return 1; // Move worse weather i.e. lower id to the end
      }
      if (a.weather[0].id > b.weather[0].id ) {
        return -1; // Move better weather i.e. higher id to the beginning
      }
      return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)
    }
    
  });

  


  // Get the user's selected activities to front of the list
  const prioritisedActivities = prioritiseUserSelection(activities)
  // Assign the best activity to best day
  assignActivities(dailyArray, prioritisedActivities, activities)

  dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)
  processedWeatherData.daily = dailyArray; // Update daily array with new activity data
  return processedWeatherData;
};


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
    if (activities[day.activity].reuse === true) {
      prioritisedActivities.push(day.activity)
    }
    prioritisedActivities.splice(index, 1);
  });
}

module.exports = recommendActivities;

