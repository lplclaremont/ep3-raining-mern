// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React, { useState } from 'react';

function LocationsForm() {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  }

  //console.log(selectedCity)

  return (
    <div>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" onChange={handleCityChange} >
        <option value="">Select a city</option>
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
      <button onClick={() => handleGenerateClick(selectedCity)}>Generate</button>
      </div>
  );
}


export default LocationsForm;