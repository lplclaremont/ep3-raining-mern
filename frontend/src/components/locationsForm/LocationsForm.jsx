import { useState } from 'react';
import '../locationsForm/LocationsForm.css';

function LocationsForm({ setResponseData }) {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleGenerateClick = () => {
    console.log(selectedCity);

    fetch(`http://localhost:3000/weather/?city=${selectedCity}`)
      .then(response => response.json())
      .then(data => setResponseData(data.daily))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <label htmlFor="city-select" className="select-label">Select a city:</label>
      <select id="city-select" onChange={handleCityChange} className="select-input">
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
      <button onClick={handleGenerateClick} className="generate-button">Generate</button>
    </div>
  );
}

export default LocationsForm;
