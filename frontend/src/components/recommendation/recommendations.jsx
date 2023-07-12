//file: frontend/src/components/recommendation/recommendations.jsx

import React from 'react';
import './recommendations.css';

function Recommendations({ recommendations }) {
  return (
    <div className='recommendations-container'>
      {recommendations.map((set, index) => (
        <div key={index} className='recommendation-set'>
          <div className='image-background'></div>
          <div className='recommendation-items'>
            {set.map((recommendation, index) => (
              <div key={index} className='recommendation-item'>
                {/* Display the recommendation details here */}
                </div>
            ))}
          </div>
          </div>
      ))}
    </div>
  );
}

module default Recommendations;