<<<<<<< HEAD
//file: frontend/src/components/day/Day.jsx

function Day ({ day }) {
=======
import Summary from "./Summary";

function Day({ day }) {
>>>>>>> origin/main
  const formattedDate = new Date(day.dt * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const roundedTemperature = day.temp.day.toFixed();
<<<<<<< HEAD
  
=======

  console.log(day);

  const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

>>>>>>> origin/main
  return (
    <article className="day" key={day.dt}>
      <div className="date">{formattedDate}</div>
      <div className="temperature">{roundedTemperature}°C</div>
      <div className="weather-icon">
        <img src={iconUrl} alt={day.weather[0].description} />
      </div>
      <div className="weather">{day.weather[0].description}</div>
<<<<<<< HEAD
      <div className="activity">
        {day.activity.name}: {day.activity.description}
        </div>
=======
      <div className="activity">{day.activity}</div>
      <Summary
        temperature={roundedTemperature}
        weather={day.weather[0]}
        activities={day.activity}
      />
>>>>>>> origin/main
    </article>
  );
}

export default Day;
