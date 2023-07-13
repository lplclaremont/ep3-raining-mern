import { useState } from 'react'
import reactLogo from './assets/react.svg'
import openWeatherLogo from './assets/openweatherlogo.png'
import './App.css'
import UserSelection from './components/userSelection/UserSelection';
import Itinerary  from './components/itinerary/Itinerary';
import Email  from './components/email/Email';

function App() {
  const [responseData, setResponseData] = useState([]);
  const [preferredActivities, setPreferredActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(responseData)

  return (
    <>
      {/* <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1 className="main-header" >Whatever the Weather</h1>
      <h2 className="sub-heading" >Get a personalised itinerary for your upcoming trip, based on the weather forecast!</h2>
      <UserSelection setResponseData={setResponseData} preferredActivities={preferredActivities} setPreferredActivities={setPreferredActivities} setErrorMessage={setErrorMessage}/>
      <Itinerary responseData={responseData} preferredActivities={preferredActivities} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
      <Email responseData={responseData}/>
      <footer>
        <p>Whatever the Weather is powered by OpenWeather API</p>
        <img src={openWeatherLogo} className="logo open-weather" alt="OpenWeather logo" />
      </footer>
    </>
  );
}

export default App
