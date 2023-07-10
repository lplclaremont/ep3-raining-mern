const activities = require('../utils/activities');

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

  const allActivities = Object.entries(activities)
    .sort((a, b) => {
      if (a[1].type === 'indoor' && b[1].type !== 'indoor') {
        return 1; // Move indoor activity to the end
      }
      if (a[1].type !== 'indoor' && b[1].type == 'indoor') {
        return -1; // Move outdoor activity to the beginning
      }
      return a[1].ranking - b[1].ranking; // Sort by temperature (hot to cold)
    })
    .map(([activity]) => activity);

  dailyArray.forEach((day) => {
    if (day.weather[0].id >= 800 && (day.temp.day >= activities[allActivities[0]].minTemp)) {
      day.activity = allActivities[0];
      allActivities.shift();
    }else if (day.weather[0].id >= 800 && (day.temp.day < activities[allActivities[0]].minTemp)) {
      const suffTempIndex = allActivities.findIndex(
        (activity) => activities[activity].minTemp >= day.temp.day //checks through the activities for the first where the type is indoor
      );
      day.activity = allActivities[suffTempIndex];
      allActivities.splice(suffTempIndex, 1);     
    }else {
      allActivities.forEach((activity) => {
        if(activities[activity].type == "indoor"){
          day.activity = allActivities[0]
        }
        }
      )
      allActivities.pop() // removes the last activity i.e. the indoor activity chosen, with the best indoor ranking
    }
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

//   const allActivities = Object.entries(activities)
//     .sort((a, b) => a[1].ranking - b[1].ranking)
//     .map(([activity]) => activity);//removes the objects, and converts into array of just activities

//   dailyArray.forEach((day) => {
//     if (day.weather[0].main !== 'Rain') {
//       day.activity = allActivities.shift();
//     } else {
//       const indoorActivityIndex = allActivities.findIndex(
//         (activity) => activities[activity].type === 'indoor' //checks through the activities for the first where the type is indoor
//       );
//       //above find the index
//       day.activity = allActivities[indoorActivityIndex]; 
//       allActivities.splice(indoorActivityIndex, 1); //removes the activity from the allactivities array
//     }
//   });

//   dailyArray.sort((a, b) => a.dt - b.dt); // Sort by date (ascending)

//   processedWeatherData.daily = dailyArray;

//   // console.log(processedWeatherData);

//   return processedWeatherData;
// };

// module.exports = recommendActivities;