import React from 'react';
import Activity from '../activity/Activity';

function Activities({ preferredActivities, setPreferredActivities }) {
  const activityNames = ['beach', 'museums', 'sports', 'shopping'];

  return (
    <div>
      {activityNames.map((activityName) => (
        <Activity
          key={activityName}
          activityName={activityName}
          preferredActivities={preferredActivities}
          setPreferredActivities={setPreferredActivities}
        />
      ))}
    </div>
  );
}

export default Activities;