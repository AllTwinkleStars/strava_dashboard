import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import ActivityFilter from '../ActivityFilter';

const TitleAndFilter = ({athleteData, selectedActivity, handleActivityChange}) => {
    return (
        <div className={dashboardStyles.topRow}>
            <h1 className={dashboardStyles.title}>Hi {athleteData.firstname}, welcome to the dashboard!</h1>
            <ActivityFilter selectedActivity={selectedActivity} handleActivityChange={handleActivityChange} />
        </div>
    )
}

export default TitleAndFilter;
