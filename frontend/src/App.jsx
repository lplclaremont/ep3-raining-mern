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
  console.log(responseData)

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
      <h1>Whatever the Weather</h1>
      <UserSelection setResponseData={setResponseData} preferredActivities={preferredActivities} setPreferredActivities={setPreferredActivities}/>
      <Itinerary responseData={responseData} preferredActivities={preferredActivities}/>
      <Email responseData={responseData}/>
    </>
  );
}

export default App
