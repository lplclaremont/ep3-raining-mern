function Summary({ temperature, weather, activities }) {
  const getSummary = () => {
    let summary = `${temperature}°C and ${weather.description}, `;
    if (weather.main === "Clear" || weather.main === "Clouds") {
      if (temperature > 25) {
        summary += `it's a warm day, a great time for the ${activities}!`;
      } else if (temperature > 15) {
        summary += `the temperature is quite comfortable, perfect for ${activities}!`;
      } else {
        summary += `it might be a bit chilly, but still a good day for ${activities}!`;
      }
    } else if (weather.main === "Rain") {
      if (temperature > 20) {
        summary += `despite the rain it's warm enough to enjoy ${activities}`;
      } else if (temperature > 18) {
        summary += `don't forget your umbrella if you're planning for ${activities}!`;
      } else {
        summary += `it is a cold, rainy day - perfec for ${activities}!`;
      }
    } else {
      summary += `the weather is unpredictable, but it's still a good day for ${activities}!`;
    }
    return summary;
  };
  return <div className="summary">{getSummary()}</div>;
}

export default Summary;
