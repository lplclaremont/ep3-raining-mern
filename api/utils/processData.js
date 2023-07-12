<<<<<<< HEAD
/*
the function that processes the weather data received from the backend.
it extracts the information and creates a new processed data object.

*/

const processData = (data) => {
  const processedData = { //initializes the object with properties
=======
const processData = (data, fromDay, toDay) => {
  let processedData = {
>>>>>>> origin/main
    lat: data.lat,
    lon: data.lon,
    daily: [],
  };
<<<<<<< HEAD
  /*
iterates over the first 3 elements of the data.daily array
for each ele create object with dt,tp, we, cl, pop
the values are extracted from the corresponding properties input data
*/
  for (let i = 0; i < 3; i++) { 
=======
  
  // ++ coerces toDay into a numeric, and increments it
  toDay++;

  for (let i = fromDay; i < toDay; i++) {
>>>>>>> origin/main
    const dailyData = {
      dt: data.daily[i].dt,
      temp: { day: data.daily[i].temp.day },
      weather: [
        {
          id: data.daily[i].weather[0].id,
          main: data.daily[i].weather[0].main,
          description: data.daily[i].weather[0].description,
          icon: data.daily[i].weather[0].icon,
        },
      ],
      clouds: data.daily[i].clouds,
      pop: data.daily[i].pop,
    };
// the dailyData object then pushed into the daily array of the processedData object
    processedData.daily.push(dailyData);
  }

  return processedData;
};

module.exports = processData;
