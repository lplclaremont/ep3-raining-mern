import { useState, useEffect } from 'react'

function Activity({ preferredActivities, setPreferredActivities }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log(checked);
    console.log(preferredActivities);
  }, [preferredActivities]);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (newChecked) {
      const updatedActivities = [...preferredActivities, 'beach'];
      setPreferredActivities(updatedActivities);
    } else {
      const updatedActivities = preferredActivities.filter(activity => activity !== 'beach');
      setPreferredActivities(updatedActivities);
    }
  }
  
  return(
    <div>
      <input type="checkbox" onChange={handleChange}></input>  
      <p>
        {checked ? 'beach' : 'not a beach'}
      </p> 
    </div> 
  );
};

export default Activity;