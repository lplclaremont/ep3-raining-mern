// file: frontend/src/components/locationsForm/LocationsForm.jsx

function LocationsForm() {
  return (
    <div>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select">
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
      </div>
  );
}


export default LocationsForm;