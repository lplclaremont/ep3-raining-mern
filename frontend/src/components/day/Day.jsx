function Day({ day }) {
  const formattedDate = new Date(day.dt * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const roundedTemperature = day.temp.day.toFixed();

  console.log(day);

  const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

  const getSummary = () => {
    let summary = `${roundedTemperature}°C and ${day.weather[0].description}, `;
    if (day.weather[0].main === "Clear" || day.weather[0].main === "Clouds") {
      if (day.temp.day > 25) {
        summary += `it's a warm day, a great time for the ${day.activity}!`;
      } else if (day.temp.day > 15) {
        summary += `the temperature is quite comfortable, perfect for ${day.activity}!`;
      } else {
        summary += `it might be a bit chilly, but still a good day for ${day.activity}!`;
      }
    } else if (day.weather[0].main === "Rain") {
      if (day.temp.day > 20) {
        summary += `despite the rain it's warm enough to enjoy ${day.activity}`;
      } else if (day.temp.day > 18) {
        summary += `don't forget your umbrella if you're planning for ${day.activity}!`;
      } else {
        summary += `it is a cold, rainy day - perfect for indoor activities or ${activity} under a warm coat and with an umbrella!`;
      }
    } else {
      summary += `the weather is unpredictable, but it's still a good day for ${day.activity}!`;
    }
    return summary;
  };
  return (
    <article className="day" key={day.dt}>
      <div className="date">{formattedDate}</div>
      <div className="temperature">{roundedTemperature}°C</div>
      <div className="weather-icon">
        <img src={iconUrl} alt={day.weather[0].description} />
      </div>
      <div className="weather">{day.weather[0].description}</div>
      <div className="activity">{day.activity}</div>
      <div className="summary">{getSummary()}</div>
    </article>
  );
}

export default Day;
