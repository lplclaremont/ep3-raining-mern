function Day ({ day }) {
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
    if (day.weather[0].main === 'Clear'|| day.weather[0].main === 'Clouds'){
      summary += `great day for the ${day.activity}`
    } else if (day.weather[0].main === 'Rain') {
      summary += `perfect day for ${day.activity}`
    } else {
      summary += `good day for ${day.activity}`
    }
    return summary
  }
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
  )

}

export default Day;