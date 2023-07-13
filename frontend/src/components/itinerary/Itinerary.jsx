import Day from "../day/Day";
import { useState, useEffect } from 'react';

function Itinerary({ responseData, preferredActivities, errorMessage, setErrorMessage}) {
  //const [errorMessage, setErrorMessage] = useState("");
  console.log(errorMessage)

  useEffect(() => {
    const preferredSet = new Set(preferredActivities.map((activity) => activity.toLowerCase()));
    const recommendedSet = new Set(responseData.map((day) => day.activity));
    const difference = [...preferredSet].filter(activity => !recommendedSet.has(activity));

    if (difference.length > 0) {
      setErrorMessage(
        'Sorry, we could not accommodate all of the activities you selected. ' +
          'We hope you still like our recommendations for your trip!'
      );
    } else if (responseData == []) {
      setErrorMessage("Sorry, the system seems to be down! You're on your own from here")
    } else {
      setErrorMessage('');
    }
  }, [responseData]);

  if (responseData.length !== 0) {
    return (
      <div className='itinerary'>
        {responseData.map((day) => (<Day day={day} key={day.dt} />))}
        {errorMessage && (
          <div className='error-message'>{errorMessage}</div>
        )}
      </div>
    );
  } else if (errorMessage) {
    return(
      <div className='error-message'>{errorMessage}</div>
    )
  }
}

export default Itinerary;
