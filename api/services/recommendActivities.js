<<<<<<< HEAD
//file: api/services/recommendActivities.js


const recommendActivities = (processedWeatherData) => {
=======

const recommendActivities = (processedWeatherData, activities, userSelectedActivities) => {
>>>>>>> origin/main
  let dailyArray = processedWeatherData.daily;
  // Update 'chosen' boolean on activities to reflect the user selection 
  userSelectedActivities.forEach((activity) => {
    activities[activity].chosen = true
  })

<<<<<<< HEAD
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
=======
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
  const prioritisedActivities = prioritiseUserSelection(activities)
  // Assign the best activity to best day
  assignActivities(dailyArray, prioritisedActivities, activities)
>>>>>>> origin/main

  dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)
  processedWeatherData.daily = dailyArray; // Update daily array with new activity data
  return processedWeatherData;
};

<<<<<<< HEAD
module.exports = recommendActivities;

//refactored to add a description, name properties to the 'day.activity' object
// for non-rainy= sunshine and rainy days=rainy
=======

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

>>>>>>> origin/main
