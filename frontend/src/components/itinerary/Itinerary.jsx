import React from 'react';

function Itinerary( {responseData} ) {

    if (typeof responseData.daily != "undefined") {
        return(
            <div>
                {responseData.daily.map((dailyData) => (<p>a day here</p>))}
            </div>
            )
    } else {
        return (<p></p>)
    }
}

export default Itinerary;