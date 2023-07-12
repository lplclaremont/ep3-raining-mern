import Day from "../day/Day";

function Itinerary({ responseData }) {
  return(
    <div data-cy="itinerary">
      {responseData.map((day) => <Day day={day} key={day.dt} />)}
    </div>
    )
}

export default Itinerary;