import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import BubbleChart from '../Charts/BubbleChart';
import StatsBox from '../StatBox';
import DetailedStatsBox from '../DetailedStatBox';
import LastActivity from '../Last Activity/LastActivity';

const TotalsAndBubble = ({ activities, selectedActivity, lastActivity }) => {
  const renderStatsBox = (title, activities, activityType) => {
    if (activityType === 'All' || activityType === title) {
      return (
        <StatsBox key={title} title={title} activities={activities} activityType={activityType} />
      );
    }
    return null;
  };

  const renderAdditionalStatsBox = () => {
    if (selectedActivity !== 'All') {
      return (
        <DetailedStatsBox key="Additional" title={selectedActivity} activities={activities} activityType={selectedActivity} />
      );
    }
    return null;
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
          {activities &&
            [...new Set(activities.map(activity => activity.sport_type))]
              .sort((a, b) => {
                const totalCountA = activities.filter(activity => activity.sport_type === a).length;
                const totalCountB = activities.filter(activity => activity.sport_type === b).length;
                return totalCountB - totalCountA;
              })
              .map(sportType => renderStatsBox(sportType, activities, selectedActivity))
          }
          
              </div>
              {renderAdditionalStatsBox()}
      </div>
      <div className={dashboardStyles.stackedCharts}>
        <BubbleChart selectedActivity={selectedActivity} activities={activities} />
        <LastActivity lastActivity={lastActivity} selectedActivity={selectedActivity} activities={activities} />
      </div>
    </div>
  );
};

export default TotalsAndBubble;
