import Activity from '../activity/Activity';


function Activities({ preferredActivities, setPreferredActivities }) {
  
  
  return(
    <>
      <Activity preferredActivities={ preferredActivities} setPreferredActivities={ setPreferredActivities} />
    </> 
  );
};

export default Activities;