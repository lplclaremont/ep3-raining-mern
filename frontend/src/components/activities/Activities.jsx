import { useState } from 'react'

function Activities({ preferredActivities }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (checked) {
      preferredActivities.push('beach')
    } else {
      let index = preferredActivities.indexOf('beach')
      preferredActivities.splice(index, 1);
    }
  }
  
  console.log(preferredActivities);
  console.log(checked);
  
  return(
    <div>
      <input type="checkbox" onChange={handleChange}></input>  
      <p>
        {checked ? 'beach' : 'not a beach'}
      </p> 
    </div> 
  );
};

export default Activities;