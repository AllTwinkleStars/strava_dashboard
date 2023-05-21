import React, { useState } from 'react';
import TitleAndFilter from '../components/Dashboard/Top Row/TitleAndFilter';
import TotalsAndBubble from '../components/Dashboard/Totals and Bubble/TotalsAndBubble';
import ChartRow from '../components/Dashboard/Chart Row/ChartRow';
import StravaLogo from '../Icons/StravaLogo';
import dashboardStyles from '../styles/Dashboard.module.css';

const Dashboard = () => {

  const storedAthleteData = localStorage.getItem('athleteData');
  const storedActivityData = localStorage.getItem('activityData');

  const athleteData = JSON.parse(storedAthleteData);
  const activities = JSON.parse(storedActivityData);

  const [selectedActivity, setSelectedActivity] = useState('All');

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const filteredActivities = selectedActivity !== 'All'
    ? activities.filter(activity => activity.sport_type === selectedActivity)
    : activities;
  
  const lastActivity = filteredActivities.length > 0 ? filteredActivities[0] : null;

  return (
    <div className="container">
      <TitleAndFilter
        athleteData={athleteData}
        selectedActivity={selectedActivity}
        handleActivityChange={handleActivityChange}
      />
      <TotalsAndBubble activities={activities} selectedActivity={selectedActivity} lastActivity={lastActivity} />
      <ChartRow selectedActivity={selectedActivity} />
      <div className={dashboardStyles.poweredBy}>
      <p>Powered by <StravaLogo /></p>

      </div>
    </div>
  );
}

export default Dashboard;