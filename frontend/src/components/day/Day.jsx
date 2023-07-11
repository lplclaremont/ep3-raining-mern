//file: frontend/src/components/day/Day.jsx

function Day ({ day }) {
  const formattedDate = new Date(day.dt * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const roundedTemperature = day.temp.day.toFixed();
  
  return (
    <article className="day" key={day.dt}>
      <div className="date">{formattedDate}</div>
      <div className="temperature">{roundedTemperature}°C</div>
      <div className="weather">{day.weather[0].description}</div>
      <div className="activity">
        {day.activity.name}: {day.activity.description}
        </div>
    </article>
  );
}

export default Day;