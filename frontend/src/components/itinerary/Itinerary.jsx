import Day from "../day/Day";
import "../itinerary/Itinerary.css";

function Itinerary({ responseData }) {
  if (responseData.length > 0) {
    return (
      <div className="itinerary">
        {responseData.map((day) => <Day day={day} key={day.dt} />)}
      </div>
    );
  } else {
    //return (<p className="no-data">No itinerary data available.</p>) //for Testing
    return null;
  }
}

export default Itinerary;
