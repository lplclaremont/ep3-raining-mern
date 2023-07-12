import Day from "../day/Day";
import { useState, useEffect } from "react";

function Itinerary({ responseData, preferredActivities }) {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const preferredSet = new Set(
      preferredActivities.map((activity) => activity)
    );
    const recommendedSet = new Set(responseData.map((day) => day.activity));
    
    const difference = [...preferredSet].filter(activity => !recommendedSet.has(activity));
    
    if (difference.length > 0) {
      setErrorMessage(
        "Sorry, we couldn’t accommodate all of the activities you selected. " +
        "We hope you still like our recommendations for your trip!"
      );
    } else {
      setErrorMessage("");
    }
  }, [responseData, preferredActivities]);

  
  if (responseData.length !== 0) {
    return (
      <div>
        {responseData.map((day) => (
          <Day day={day} key={day.dt} />
        ))}
      </div>
    );
  } else {
    return <p></p>;
  }
}

export default Itinerary;
