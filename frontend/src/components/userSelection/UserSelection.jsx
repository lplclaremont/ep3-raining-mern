//file: frontend/src/components/userSelection/UserSelection.jsx

import { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../userSelection/UserSelection.css';
import ActivityContainer from '../activityContainer/ActivityContainer';
import DateRange from '../dateRange/DateRange';
import citiesOptions from './citiesOptions';

//after import the dependency and component
//we define an array that contains objects (with properties key+value+label) representing each city
const cities = [
  { key: 'brighton', value: 'brighton', label: 'Brighton, UK' },
  { key: 'bournemouth', value: 'bournemouth', label: 'Bournemouth, UK' },
  { key: 'cornwall', value: 'cornwall', label: 'Cornwall, UK' },
  { key: 'danang', value: 'danang', label: 'DaNang, Vietnam' },
  { key: 'phuket', value: 'phuket', label: 'Phuket, Thailand' },
  { key: 'bali', value: 'bali', label: 'Bali, Indonesia' },
  { key: 'lisbon', value: 'lisbon', label: 'Lisbon, Portugal' },
  { key: 'riga', value: 'riga', label: 'Riga, Latvia' },
  { key: 'valencia', value: 'valencia', label: 'Valencia, Spain' },
  { key: 'santorini', value: 'santorini', label: 'Santorini, Greece' },
  { key: 'miami', value: 'miami', label: 'Miami, US' },
  { key: 'honolulu', value: 'honolulu', label: 'Honolulu, US' },
  { key: 'nice', value: 'nice', label: 'Nice, France' },
  { key: 'mykonos', value: 'mykonos', label: 'Mykonos, Greece' },
  { key: 'malibu', value: 'malibu', label: 'Malibu, US' },
  { key: 'athens', value: 'athens', label: 'Athens, Greek' },       
];
//declare component and pass the prop as parameter
// use 'useState' hook to create state variables
function UserSelection({ setResponseData }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [preferredActivities, setPreferredActivities] = useState([]);
<<<<<<< HEAD
  const [startDate, setStarDate] = useState(null);// for date-picker
  const [endDate, setEndDate] = useState(null);

  // this function will be triggered when the user selects a dropdown
//it updates the state with the value of the selected option
=======
  // default behaviour if no date range selected: 3 days including today
  const [fromDay, setFromDay] = useState(0);
  const [toDay, setToDay] = useState(2);
  
>>>>>>> origin/main
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
//define function which is triggered when the user click 'generate' button
//it constructs the url based on the selected city+preferred activities
// fetching request sending to get data and updates the 'responseData' state
//with required information
  const handleGenerateClick = () => {
    const activitiesParameter = preferredActivities.join(',').toLowerCase();
    let url = `http://localhost:3000/weather/?city=${selectedCity}&fromDay=${fromDay}&toDay=${toDay}`

<<<<<<< HEAD
    if (startDate && endDate) {
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      url += `&startDate=${startDateStr}&endDate=${endDateStr}`;
    }
    if (activitiesParameter !== '') {
      url += `&activities=${activitiesParameter}`;
    }
=======
    if (activitiesParameter != []) url += `&activities=${activitiesParameter}`;
>>>>>>> origin/main
    
    console.log(selectedCity);
    console.log(preferredActivities);
    console.log(activitiesParameter);

    fetch(url)
      .then(response => response.json())
      .then(data => setResponseData(data.daily))
      .catch(error => console.error(error));
  };

//return elements, onChange event listener bound to the function.
//inside the select, generate the city options using map() function and 'cities' array.
//AC component that handles the user's preferred activities
// 'generate' button is only visible when a city is selected and it triggered by 'hGC'function when cliced
  return (
    <div>
<<<<<<< HEAD
      <div>
      <label htmlFor="city-select">Select a city:</label>
      <select id="city-select" data-cy="city-dropdown" onChange={handleCityChange}>
      <option value="">Select a city</option>
      {cities.map((city) => (
        <option key={city.key} value={city.value}>
          {city.label}
        </option>
      ))}
      </select>
=======
      <label htmlFor="city-select">
        Select a city:
      </label>
      <select className="city-select" data-cy="city-dropdown" onChange={handleCityChange}>
        {citiesOptions.map((city) => (
          <option key={city.key} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      <ActivityContainer preferredActivities={ preferredActivities} setPreferredActivities={ setPreferredActivities} />
      <DateRange setFromDay={setFromDay} setToDay={setToDay}/>
      {selectedCity && (
        <button onClick={() => handleGenerateClick(selectedCity)}>Generate</button>
      )}
>>>>>>> origin/main
      </div>

      <div>
      <DatePicker
      selected={startDate}
      onChange={(date) => setStarDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      maxDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)} //in the future 7 days
      />
      <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      maxDate={new Date().getTime() + 7 * 24 * 60 * 60 * 1000}// 7 days +=
      />
    </div>
    <ActivityContainer preferredActivities={ preferredActivities} setPreferredActivities={ setPreferredActivities} />
    {selectedCity && startDate && endDate && (
      <button onClick={() => handleGenerateClick(selectedCity)}>Generate</button>
    )}
    </div>
  );
}

export default UserSelection;

//this code is generates the city options dynamically.
// and display 7 days range for user to select, start and end Dates
// install react-datepicker library