import Day from '../day/Day';
import { useState, useEffect } from 'react';

function Itinerary({ responseData, preferredActivities }) {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const responseActivities = responseData.map((day) => day.activity);

    const areAllRecommendationsFulfilled = preferredActivities.every((activity) => {
      responseActivities.includes(activity)
    })

    if (!areAllRecommendationsFulfilled) {
      setErrorMessage(
        'Sorry, we could not accommodate all of the activities you selected. ' +
          'We hope you still like our recommendations for your trip!'
      );
    } else {
      setErrorMessage('');
    }
  }, [responseData, preferredActivities]);

  if (responseData.length !== 0) {
    return (
      <div className='itinerary'>
        {responseData.map((day) => (<Day day={day} key={day.dt} />))}
        {errorMessage && (
          <div className='error-message'>{errorMessage}</div>
        )}
      </div>
    );
  } else {
    return <p></p>;
  }
}

export default Itinerary;
