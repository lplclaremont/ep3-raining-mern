const processData = (data, fromDay, toDay) => {
  const processedData = {
    lat: data.lat,
    lon: data.lon,
    daily: [],
  };

  for (let i = fromDay; i < (toDay + 1); i++) {
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

    processedData.daily.push(dailyData);
  }

  return processedData;
};

module.exports = processData;
