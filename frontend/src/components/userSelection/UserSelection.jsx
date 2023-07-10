// file: frontend/src/components/locationsForm/LocationsForm.jsx

import { useState } from 'react'
import ActivityContainer from '../activityContainer/ActivityContainer';

function UserSelection({ setResponseData }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [preferredActivities, setPreferredActivities] = useState([]);
  
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  }

  const handleGenerateClick = () => {
    const activitiesParameter = preferredActivities.join(',').toLowerCase();

    console.log(selectedCity);
    console.log(preferredActivities);
    console.log(activitiesParameter);

    fetch(`http://localhost:3000/weather/?city=${selectedCity}&activities=${activitiesParameter}`)
    .then(response => response.json())
    .then(data => setResponseData(data.daily))
    .catch(error => console.error(error));
  }

  return (
    <div>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" data-cy="city-dropdown" onChange={handleCityChange}>
        <option key='default-empty' value=''>
          Select a city
        </option>
        <option key='brighton' value='brighton'>
          Brighton, UK
        </option>
        <option key='lisbon' value='lisbon'>
          Lisbon, Portugal
        </option>
        <option key='valencia' value='valencia'>
          Valencia, Spain
        </option>
        <option key='riga' value='riga'>
          Riga, Latvia
        </option>
        <option key='santorini' value='santorini'>
          Santorini, Greece
        </option>
      </select>
      <ActivityContainer preferredActivities={ preferredActivities} setPreferredActivities={ setPreferredActivities} />
      {selectedCity && (
        <button onClick={() => handleGenerateClick(selectedCity)}>Generate</button>
      )}
      </div>
  );
}

export default UserSelection;