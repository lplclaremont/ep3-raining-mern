import { useState } from 'react'
import './App.css'
import UserSelection from './components/userSelection/UserSelection';
import Itinerary  from './components/itinerary/Itinerary';

function App() {
  const [responseData, setResponseData] = useState([]);
  console.log(responseData)

  return (
    <>
      <h1>WeatherWhisper App</h1>
      <UserSelection setResponseData={ setResponseData }/>
      <Itinerary responseData={ responseData }/>
    </>
  );
}
export default App;
