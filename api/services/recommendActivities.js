//const activities = require('../utils/activities');

const recommendActivities = (processedWeatherData, activities) => {
  let dailyArray = processedWeatherData.daily;

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

    console.log(orderedActivities)

  dailyArray.forEach((day) => {
    const index = orderedActivities.findIndex(
      (activity) => activities[activity].optimalConditions.includes(day.weather[0].id)
    )
    day.activity = orderedActivities[index]
    orderedActivities.splice(index, 1);

    // if (day.weather[0].id >= 800 && (day.temp.day >= activities[orderedActivities[0]].minTemp)) {
    //   day.activity = orderedActivities[0];
    //   orderedActivities.shift();
    // }else if (day.weather[0].id >= 800 && (day.temp.day < activities[orderedActivities[0]].minTemp)) {
    //   const suffTempIndex = orderedActivities.findIndex(
    //     (activity) => activities[activity].minTemp >= day.temp.day //checks through the activities for the first where the type is indoor
    //   );
    //   day.activity = orderedActivities[suffTempIndex];
    //   orderedActivities.splice(suffTempIndex, 1);     
    // }else {
    //   orderedActivities.forEach((activity) => {
    //     if(activities[activity].type == "indoor"){
    //       day.activity = orderedActivities[0]
    //     }
    //     }
    //   )
    //   orderedActivities.pop() // removes the last activity i.e. the indoor activity chosen, with the best indoor ranking
    // }
  });

  dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)

  processedWeatherData.daily = dailyArray;

  // console.log(processedWeatherData);

  return processedWeatherData;
};

module.exports = recommendActivities;

// const activities = require('../utils/activities');

// const recommendActivities = (processedWeatherData, activities) => {
//   let dailyArray = processedWeatherData.daily;

//   dailyArray.sort((a, b) => {
//     if (a.weather[0].main === 'Rain' && b.weather[0].main !== 'Rain') {
//       return 1; // Move rainy day to the end
//     }
//     if (a.weather[0].main !== 'Rain' && b.weather[0].main === 'Rain') {
//       return -1; // Move non-rainy day to the beginning
//     }
//     return b.temp.day - a.temp.day; // Sort by temperature (hot to cold)
//   });

//   const orderedActivities = Object.entries(activities)
//     .sort((a, b) => a[1].ranking - b[1].ranking)
//     .map(([activity]) => activity);//removes the objects, and converts into array of just activities

//   dailyArray.forEach((day) => {
//     if (day.weather[0].main !== 'Rain') {
//       day.activity = orderedActivities.shift();
//     } else {
//       const indoorActivityIndex = orderedActivities.findIndex(
//         (activity) => activities[activity].type === 'indoor' //checks through the activities for the first where the type is indoor
//       );
//       //above find the index
//       day.activity = orderedActivities[indoorActivityIndex]; 
//       orderedActivities.splice(indoorActivityIndex, 1); //removes the activity from the orderedActivities array
//     }
//   });

//   dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)

//   processedWeatherData.daily = dailyArray;

//   // console.log(processedWeatherData);

//   return processedWeatherData;
// };

// module.exports = recommendActivities;