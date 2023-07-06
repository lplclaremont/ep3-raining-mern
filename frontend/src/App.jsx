//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LocationsForm from './components/locationsForm/LocationsForm';
import ResponseDisplay from './components/display/ResponseDisplay';
import { useState } from 'react';


function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
  }

  const handleGenerateClick = () => {
    //fetch(`http://localhost:3000/weather?city=${selectedCity}`, {
    fetch(`/weather?city=${selectedCity}`, {
      method: 'GET',
    }) 
    .then((response) => {
      if (!response.ok) {
        return response.json().then(data => Promise.reject(data));
      }
      return response.json();
    })
    .then((data) => setResponseData(data))  
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WeatherWhisper App</h1>
      <LocationsForm
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        onGenerateClick={handleGenerateClick}
      />
      <ResponseDisplay data={responseData} />
    </>
  );
}

export default App;
//instead of use async/wait to fetching data and handling error ..async() => try/catch block...
// we use Promises and the .then based approach does the same job but in different sytle
// to handle asynchronous operations