import { useState } from 'react';
import './Activity.css'; 

function Activity({ activityName, preferredActivities, setPreferredActivities }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const newClicked = !clicked;
    setClicked(newClicked);

    if (newClicked) {
      const updatedActivities = [...preferredActivities, activityName];
      setPreferredActivities(updatedActivities);
    } else {
      const updatedActivities = preferredActivities.filter(activity => activity !== activityName);
      setPreferredActivities(updatedActivities);
    }
  }
  
  return(
    <button className={`button-activity ${clicked ? 'active' : ''}`} onClick={handleClick}>
      {activityName}
    </button>
  );
};

export default Activity;