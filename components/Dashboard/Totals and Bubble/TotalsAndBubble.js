import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import BubbleChart from '../Charts/BubbleChart';
import StatsBox from '../StatBox';

const TotalsAndBubble = ({ athleteStats, selectedActivity }) => {

    const renderStatsBox = (title, stats, activityType) => {
        if (stats.count !== 0 && (activityType === 'All' || activityType === title)) {
            return (
                <StatsBox title={title} stats={stats} activityType={activityType} />
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
                        <p>Moving Time</p>
                    </div>
                </div>
                <div className={dashboardStyles.statsContainer}>
                    {athleteStats && athleteStats.all_run_totals && renderStatsBox('Run', athleteStats.all_run_totals, selectedActivity)}
                    {athleteStats && athleteStats.all_ride_totals && renderStatsBox('Ride', athleteStats.all_ride_totals, selectedActivity)}
                    {athleteStats && athleteStats.all_swim_totals && renderStatsBox('Swim', athleteStats.all_swim_totals, selectedActivity)}
                    {/* Add more activity stats rendering based on selectedActivity */}
                </div>
            </div>
            <BubbleChart selectedActivity={selectedActivity} />
        </div>
    )
}

export default TotalsAndBubble
