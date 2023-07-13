// file: frontend/src/components/locationsForm/LocationsForm.jsx

import { useState } from 'react'
import ActivityContainer from '../activityContainer/ActivityContainer';
import DateRange from '../dateRange/DateRange';
import citiesOptions from './citiesOptions';
import './UserSelection.css'; 

function UserSelection({ setResponseData, preferredActivities, setPreferredActivities, setErrorMessage }) {
  const [selectedCity, setSelectedCity] = useState('');
  // default behaviour if no date range selected: 3 days including today
  const [fromDay, setFromDay] = useState(0);
  const [toDay, setToDay] = useState(2);
  
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  }

  const handleGenerateClick = () => {
    const activitiesParameter = preferredActivities.join(',').toLowerCase();
    let url = `http://localhost:3000/weather/?city=${selectedCity}&fromDay=${fromDay}&toDay=${toDay}`

    if (activitiesParameter != []) url += `&activities=${activitiesParameter}`;
    
    console.log(selectedCity);
    console.log(preferredActivities);
    console.log(activitiesParameter);

    fetch(url).then(response => response.json())
      .then(data => {
        setResponseData(data.daily)})
      .catch(error => { 
        setErrorMessage("Sorry, the system seems to be down! You're on your own from here")
        console.error(error)});
  }

  return (
    <div>
      {/* <label htmlFor="city-select">Select a city</label> */}
      <select className="city-select" data-cy="city-dropdown" onChange={handleCityChange}>
        {citiesOptions.map((city) => (
          <option key={city.key} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      <ActivityContainer preferredActivities={preferredActivities} setPreferredActivities={setPreferredActivities}/>
      <DateRange setFromDay={setFromDay} setToDay={setToDay}/>
      {selectedCity && (
        <div>
        <button onClick={() => handleGenerateClick(selectedCity)}>Generate</button>
        </div>
      )}
      </div>
  );
}

export default UserSelection;