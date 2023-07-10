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
        <option value="">Select a city:</option>
        <option key='brighton' value='brighton'>
          Brighton, UK
        </option>
        <option key='bournemouth' value='bournemouth'>
          Bournemouth, UK
        </option>
        <option key='cornwall' value='cornwall'>
          Cornwall, UK
        </option>	   
        <option key='danang' value='danang'>
        DaNang, Vietnam
        </option>
        <option key='phuket' value='phuket'>
        Phuket, Thailand
        </option>
        <option key='bali' value='bali'>
        Bali, Indonesia
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
        <option key='miami' value='miami'>
         Miami, US
        </option>
        <option key='honolulu' value='honolulu'>
        Honolulu, US
        </option>
        <option key='nice' value='nice'>
        Nice, France
        </option>
        <option key='mykonos' value='mykonos'>
        Mykonos, Greece
        </option>
        <option key='malibu' value='malibu'>
        Malibu, US
        </option>
        <option key='athens' value='athens'>
        Athens, Greek
        </option>
      </select>
      {selectedCity && (
      <button onClick={handleGenerateClick} className="generate-button">Generate</button>
      )}
      </div>
  );
}

export default LocationsForm;
