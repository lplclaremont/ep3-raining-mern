// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React from 'react';

function LocationsForm({ cityOptions, selectedCity, handleCityChange }) {
  return (
    <div>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" value={selectedCity} onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cityOptions.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      </div>
  );
}



export default LocationsForm;