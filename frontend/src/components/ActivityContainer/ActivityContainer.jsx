//file: frontend/src/components/ActivityContainer/ActivityContainer.jsx

import Activity from '../activity/Activity';

function ActivityContainer({ preferredActivities, setPreferredActivities }) {
  const activityNames = ['Beach', 'Museums', 'Sports', 'Shopping', 'Eating', 'Sightseeing'];

  return (
    <div className='ActivityContainer'>
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

export default ActivityContainer;