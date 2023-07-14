import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      <h1 className="main-header" >
      <div class="relative">
        <img src="/public/header.png" alt = "Whatever the Weather"/>
        <img src="/public/cloud.png" alt = "image" class="image1"/>
        <img src="/public/large-sun.png" alt = "image" class="image2"/>
        <img src="/public/sun-hat.png" alt = "image" class="image3"/>
        <img src="/public/flippedrain.png" alt = "image" class="rain2 "/>
        <img src="/public/snow.png" alt = "image" class="snow "/>
      </div>
      </h1>
      <UserSelection setResponseData={setResponseData} preferredActivities={preferredActivities} setPreferredActivities={setPreferredActivities} setErrorMessage={setErrorMessage}/>
      <Itinerary responseData={responseData} preferredActivities={preferredActivities} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
      <Email responseData={responseData}/>
    </>
  );
}

export default App
