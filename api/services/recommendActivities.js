
const recommendActivities = (processedWeatherData) => {
    let dailyArray = [];
    processedWeatherData.daily.forEach((day) => {
        console.log(`weather id: ${day.weather[0].id}\nweather main: ${day.weather[0].main}\nweather description: ${day.weather[0].description}\nclouds: ${day.clouds}\npop: ${day.pop}`)
        dayObject = {
            "dt": day.dt,
            "temp": day.temp,
            "weather": day.weather,
            'activity': null
        }
        dailyArray.push(dayObject);
    });
    
    const outdoorActivities = ["Beach", "Sightseeing", "Sports"];
    const indoorActivities = ["Museums", "Shopping", "Eating"];


    dailyArray.sort((a, b) => b.temp.day - a.temp.day);
    const rainyDays = dailyArray.filter((day) => day.weather[0].main === 'Rain');
    const nonRainyDays = dailyArray.filter((day) => day.weather[0].main !== 'Rain');

    nonRainyDays.forEach((day, index) => {
        day.activity = outdoorActivities[index];
      });
    rainyDays.forEach((day, index) => {
        day.activity = indoorActivities[index];
      });
    
    dailyArray = [...nonRainyDays, ...rainyDays];
    dailyArray.sort((a, b) => a.dt - b.dt);


    return {"daily": dailyArray};
};

module.exports = recommendActivities