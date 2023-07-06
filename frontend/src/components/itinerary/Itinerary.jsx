import React from 'react';

function Itinerary( {itineraryData} ) {

    if (typeof itineraryData.daily != "undefined") {
        return(
            <div>
                {itineraryData.daily.map((dailyData) => (<p>a day here</p>))}
            </div>
            )
    } else {
        return (<p></p>)
    }
}

export default Itinerary;