import React from 'react';
import dashboardStyles from '../../styles/Dashboard.module.css';
import { metersToKilometers, formatTime } from '../../helper_functions/helper';

const StatsBox = ({ title, stats, activityType }) => {
  if (stats.count !== 0 && (activityType === 'All' || activityType === title)) {
    return (
      <div className={dashboardStyles.statBox}>
        <div className={dashboardStyles.statRow}>
          <h2>{title}</h2>
          <p>{stats.count}</p>
          <p>{metersToKilometers(stats.distance)}KM</p>
          <p>{formatTime(stats.elapsed_time)}</p>
          <p>{formatTime(stats.moving_time)}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default StatsBox;