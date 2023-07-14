function Summary({ temperature, weather, activities }) {
  const getSummary = () => {
    let summary = '';
    if (weather.main === "Clear" || weather.main === "Clouds") {
      if (temperature > 25) {
        summary += `It's a warm day, a great time for the ${activities}!`;
      } else if (temperature > 15) {
        summary += `The temperature is quite comfortable, perfect for ${activities}!`;
      } else {
        summary += `It might be a bit chilly, but still a good day for ${activities}!`;
      }
    } else if (weather.main === "Rain") {
      if (temperature > 20) {
        summary += `Despite the rain, it's warm enough to enjoy ${activities}`;
      } else if (temperature > 18) {
        summary += `Don't forget your umbrella if you're planning for ${activities}!`;
      } else {
        summary += `It's a cold, rainy day - perfect for ${activities}!`;
      }
    } else {
      summary += `The weather is unpredictable, but it's still a good day for ${activities}!`;
    }
    return summary;
  };
  return <div className="summary">{getSummary()}</div>;
}

export default Summary;
