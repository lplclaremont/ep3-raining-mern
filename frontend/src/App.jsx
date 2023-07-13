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
      <div>
        {/* <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1 className="main-header" >Whatever the Weather</h1>
      <UserSelection setResponseData={setResponseData} preferredActivities={preferredActivities} setPreferredActivities={setPreferredActivities} setErrorMessage={setErrorMessage}/>
      <Itinerary responseData={responseData} preferredActivities={preferredActivities} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
      <Email responseData={responseData}/>
    </>
  );
}

export default App
