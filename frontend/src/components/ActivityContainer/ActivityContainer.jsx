import Activity from '../activity/Activity';

function ActivityContainer({ preferredActivities, setPreferredActivities }) {
  const activityNames = ['Beach', 'Museums', 'Sports', 'Shopping', 'Eating', 'Sightseeing'];

  return (
    <div className=''>
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