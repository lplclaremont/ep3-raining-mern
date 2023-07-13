import Summary from "./Summary";
import './Day.css'

function Day({ day }) {
  const formattedDate = new Date(day.dt * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const roundedTemperature = day.temp.day.toFixed();

  const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

  return (
    <article className="day" key={day.dt} data-cy="day-display">
      <div>
      <div className="date">{formattedDate}</div>
      <div className="temperature">{roundedTemperature}°C</div>
      </div>
      <div>
      <div className="weather">{day.weather[0].description}</div>
      <div className="weather-icon">
        <img src={iconUrl} alt={day.weather[0].description} />
      </div>
      </div>
      <div>
        <p className="recommended-activity">recommended activity</p>
      <div className="activity">{day.activity}</div>
      </div>
      <Summary
        temperature={roundedTemperature}
        weather={day.weather[0]}
        activities={day.activity}
      />
    </article>
  );
}

export default Day;
