import { useState, useEffect } from 'react';
import './Activity.css'; 

function Activity({ activityName, preferredActivities, setPreferredActivities }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log(clicked);
    console.log(preferredActivities);
  }, [preferredActivities]);

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