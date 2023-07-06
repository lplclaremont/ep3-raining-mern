// file: frontend/src/components/ResponseDisplay.jsx

import React from 'react';

function ResponseDisplay() {
  return (
    <div>
    <h2>Response Display</h2>
    {responseData && (
      <div>
        <h3>Day: {responseData.Day}</h3>
        <p>Weather: {responseData.weather}</p>
        <p>Suggested Activities: {responseData.activities.join(',')}</p>
      </div>
      )};
    </div>
  );
}

export default ResponseDisplay;