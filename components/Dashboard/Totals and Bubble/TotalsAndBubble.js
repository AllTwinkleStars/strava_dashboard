import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import BubbleChart from '../Charts/BubbleChart';
import StatsBox from '../StatBox';
import LastActivity from '../Last Activity/LastActivity';

const TotalsAndBubble = ({ activities, selectedActivity, lastActivity }) => {

    const renderStatsBox = (title, activities, activityType) => {
        if ((activityType === 'All' || activityType === title)) {
            return (
                <StatsBox title={title} activities={activities} activityType={activityType} />
            );
        }
        return (
            null
        );
    };

    return (
        <div className={dashboardStyles.boxContainer}>
            <div className={dashboardStyles.allTotals}>
                <div className={dashboardStyles.statBoxHeader}>
                    <div className={dashboardStyles.statRow}>
                        <h2>Type</h2>
                        <p>Total count</p>
                        <p>Distance</p>
                        <p>Elapsed Time</p>
                    </div>
                </div>
                <div className={dashboardStyles.statsContainer}>
                    {activities && renderStatsBox('Run', activities, selectedActivity)}
                    {activities && renderStatsBox('Ride', activities, selectedActivity)}
                    {activities && renderStatsBox('Swim', activities, selectedActivity)}
                    {activities && renderStatsBox('WeightTraining', activities, selectedActivity)}
                    {activities && renderStatsBox('Workout', activities, selectedActivity)}
                    {activities && renderStatsBox('Walk', activities, selectedActivity)}
                </div>
            </div>
            <div className={dashboardStyles.stackedCharts}>
                <BubbleChart selectedActivity={selectedActivity} />
                <LastActivity lastActivity={lastActivity} selectedActivity={selectedActivity} />
            </div>
        </div>
    )
}

export default TotalsAndBubble
