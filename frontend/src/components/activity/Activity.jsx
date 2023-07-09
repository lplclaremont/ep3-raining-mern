import { useState, useEffect } from 'react'

function Activity({ activityName, preferredActivities, setPreferredActivities }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log(checked);
    console.log(preferredActivities);
  }, [preferredActivities]);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (newChecked) {
      const updatedActivities = [...preferredActivities, activityName];
      setPreferredActivities(updatedActivities);
    } else {
      const updatedActivities = preferredActivities.filter(activity => activity !== activityName);
      setPreferredActivities(updatedActivities);
    }
  }
  
  return(
    <div>
      <input type="checkbox" onChange={handleChange}></input>  
      <p>
        {checked ? `${activityName}` : `not a ${activityName}`}
      </p> 
    </div> 
  );
};

export default Activity;