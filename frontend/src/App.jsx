import { useState } from 'react'
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
      <h1 className="main-header" >
      <div className="relative">
        <img src="/header.png" alt="Whatever the Weather"/>
        <img src="/cloud.png" alt="image" className="image1"/>
        <img src="/large-sun.png" alt="image" className="image2"/>
        <img src="/sun-hat.png" alt="image" className="image3"/>
        <img src="/flippedrain.png" alt="image" className="rain2 "/>
        <img src="/snow.png" alt="image" className="snow "/>
      </div>
      </h1>
      <h2 className="sub-heading" >A personalised itinerary for your upcoming trip,<br/>based on the weather forecast!</h2>
      <UserSelection setResponseData={setResponseData} preferredActivities={preferredActivities} setPreferredActivities={setPreferredActivities} setErrorMessage={setErrorMessage}/>
      <Itinerary responseData={responseData} preferredActivities={preferredActivities} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
      <Email responseData={responseData}/>
    </>
  );
}

export default App
