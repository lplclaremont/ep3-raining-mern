// file: frontend/src/components/locationsForm/LocationsForm.jsx

import React, { useState } from 'react';

function LocationsForm() {
  
  const [selectedCity, setSelectedCity] = useState('');
  const [message, setMessage] = useState(''); // display mock msg
  
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  }

  const handleGenerateClick = () => {
    //uncomment the following lines out to use the actual API
    /*
    fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: selectedCity }),
    })
      .then((response) => response.json())
      .then((data) => {
        //handle  the actual API response here
        setMessage(`Day: ${data.Day}<br />
        Weather: ${data.weather}<br />
        activities: ${data.activities.join(',)}`
        );
      });
    */

   // comment out the following lines to use the actual API
   //mock API response
   const mockResponse = {
    day: 'Monday',
    weather: 'Sunny',
    activities: ['Hiking', 'Picnic'],
   };
   setMessage(
    `Day: ${mockResponse.day}<br />
    Weather: ${mockResponse.weather}<br />
    activities: ${mockResponse.activities.join(', ')}`
    );
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
      {message && <p dangerouslySetInnerHTML={{__html: message }}></p>}
      </div>
  );
}

export default LocationsForm;