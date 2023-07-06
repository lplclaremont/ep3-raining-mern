// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React from 'react';

function LocationsForm({selectedCity, onCityChange, onGenerateClick }) {

  const handleCityChange = (event) => {
    onCityChange(event.target.value);
  }
  const handleGenerateClick = () => {
    onGenerateClick();
  }

  return (
    <div>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" onChange={handleCityChange}>
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
