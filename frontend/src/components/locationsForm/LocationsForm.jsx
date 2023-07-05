// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React from 'react';

function LocationsForm({ cityOptions, selectedCity, handleCityChange }) {
  return <label for="cars">Choose a car:</label>
    <select id="cars" name="cars">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select>
}



export default LocationsForm;