import Activity from '../activity/Activity';
import './ActivityContainer.css'; 

function ActivityContainer({ preferredActivities, setPreferredActivities }) {
  const activityNames = ['Beach', 'Museums', 'Sports', 'Hiking', 'Shopping', 'Dining', 'Sightseeing', 'Theatre', 'Library'];

  return (
    <div className='ActivityContainer' data-cy="activity-container">
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