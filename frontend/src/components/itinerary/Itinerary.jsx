import Day from "../day/Day";
import { useEffect } from 'react';
import './Itinerary.css'

function Itinerary({ responseData, preferredActivities, errorMessage, setErrorMessage}) {

  useEffect(() => {
    const preferredSet = new Set(preferredActivities.map((activity) => activity.toLowerCase()));
    const recommendedSet = new Set(responseData.map((day) => day.activity));
    const difference = [...preferredSet].filter(activity => !recommendedSet.has(activity));

    if (difference.length > 0) {
      setErrorMessage(
        `Sorry, we couldn't accommodate all of the activities you selected. ` +
          'We hope you still like our recommendations for your trip!'
      );
    } else {
      setErrorMessage('');
    }
  }, [responseData]);

  if (responseData.length !== 0) {
    return (
      <div className='itinerary' data-cy="itinerary">
        {responseData.map((day) => <Day day={day} key={day.dt} />)}
        {errorMessage && (
          <div className='feedback-message'>{errorMessage}</div>
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
