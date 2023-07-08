// file: frontend/src/components/locationsForm/LocationsForm.jsx

import { useState } from 'react'
import '../locationsForm/LocationsForm.css';

function LocationsForm({ setResponseData }) {
  const [selectedCity, setSelectedCity] = useState('');
  
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  }
/*
the function is called when the generate button is clicked.
it uses fetch function to make a GET request to the /weather endpoint
with the selected city as a query parameter

frontend sending GET to backend api
the response from the api is converted to json
json data then passes to setResponseData function, which is a prop
passed to LocationsForm component.
this allows the parent component to handle and store teh response data
any errors occur during the request/response are caught and logged to console

*/
  const handleGenerateClick = () => {
    console.log(selectedCity)

    fetch(`http://localhost:3000/weather/?city=${selectedCity}`)
    .then(response => response.json())
    .then(data => setResponseData(data.daily))
    .catch(error => console.error(error));
  }

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
      <button onClick={() => handleGenerateClick(selectedCity)} className="generate-button">Generate</button>
      </div>
  );
}

export default LocationsForm;