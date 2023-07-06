// file: frontend/src/components/display/ResponseDisplay.jsx


import React from 'react';

// function is to only display whatever data -from backend setup- 

function ResponseDisplay({ data }) {
  if (!data) {
    return null; // no render if null
  }
  
  return (
    <div>
      <h2>Response Display</h2>
      <h3>Day: {data.day}</h3>
      <p>Weather: {data.weather}</p>
      <p>Suggested Activities: {data.activities.join(',')}</p>
    </div>
  );
}
  
export default ResponseDisplay;