import Day from "../day/Day";

function Itinerary({ responseData }) {

  if (responseData != []) {
    return(
      <div>
        {responseData.map((day) => <Day day={day} key={day.dt}/>)}
      </div>
    )
  } else {
    return (<p></p>)
  }
}

export default Itinerary;