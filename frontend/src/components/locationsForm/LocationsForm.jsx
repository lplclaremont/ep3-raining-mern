// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React from 'react';

function LocationsForm() {
  return (
  <form>
  <label htmlFor="locations">Choose a destination:</label>
    <select id="locations" name="locations">
      <option value="brighton">Brighton, UK</option>
      <option value="lisbon">Lisbon, Portugal</option>
      <option value="valencia">Valencia, Spain</option>
      <option value="liga">Riga, Latvia</option>
      <option value="santorini">Santorini, Greece</option>
    </select>
  </form>
  )
}


export default LocationsForm;