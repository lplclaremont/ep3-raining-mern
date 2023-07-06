// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React, { useState } from 'react';

function LocationsForm() {
  const [selectedCity, setSelectedCity] = useState('');
  const [message, setMessage] = useState(''); // display mock msg

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  }

  const handleGenerateClick = () => {
    fetch('/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: selectedCity }),
    })
      .then((response) => response.text())
      .then((data) => {
        try {
          const parsedData = JSON.parse(data);
          setMessage(`Day: ${parsedData?.Day}<br />
            Weather: ${parsedData?.weather}<br />
            Activities: ${parsedData?.activities?.join(', ')}`);
        } catch(error) {
          console.error(error);
          setMessage('Error occurred while parsing weather data.');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error occurred while fetching weather data.');
      });
  };


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
      {message && <p dangerouslySetInnerHTML={{ __html: message }}></p>}
    </div>
  );
}

export default LocationsForm;
