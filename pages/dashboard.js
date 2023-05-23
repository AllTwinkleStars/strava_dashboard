import React, { useState } from 'react';
import TitleAndFilter from '../components/Dashboard/Top Row/TitleAndFilter';
import TotalsAndBubble from '../components/Dashboard/Totals and Bubble/TotalsAndBubble';
import ChartRow from '../components/Dashboard/Chart Row/ChartRow';
import StravaLogo from '../Icons/StravaLogo';
import dashboardStyles from '../styles/Dashboard.module.css';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

const Dashboard = (props) => {
  
  const athleteData = props.athlete;
  const activities = props.activities;

  const [selectedActivity, setSelectedActivity] = useState('All');

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const filteredActivities = selectedActivity !== 'All'
    ? activities.filter(activity => activity.sport_type === selectedActivity)
    : activities;

  const lastActivity = filteredActivities.length > 0 ? filteredActivities[0] : null;

  const springs = useSpring({
    from: { x: -100 },
    to: { x: 0 },
  })

  return (
    <animated.div
      style={{
        ...springs,
      }}>
      <div className="container">
        <TitleAndFilter
          athleteData={athleteData}
          activities={activities}
          selectedActivity={selectedActivity}
          handleActivityChange={handleActivityChange}
        />
        <TotalsAndBubble activities={activities} selectedActivity={selectedActivity} lastActivity={lastActivity} />
        <ChartRow selectedActivity={selectedActivity} activities={activities} />
        <div className={dashboardStyles.poweredBy}>
          <div className={dashboardStyles.poweredText}>Powered by <Link href='https://www.strava.com/' target='_blank'><StravaLogo /></Link></div>
        </div>
      </div>
    </animated.div>

  );
}

export default Dashboard;