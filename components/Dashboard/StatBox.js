import React from 'react';
import dashboardStyles from '../../styles/Dashboard.module.css';
import { metersToKilometers, formatTime, convertCamelCaseToWords } from '../../helper_functions/helper';

const StatsBox = ({ title, activities, activityType }) => {
  if (activityType === 'All' || activityType === title) {
    let count = 0;
    let distance = 0;
    let totalElapsedTime = 0;

    for (let activity of activities) {
      if (activity.sport_type === title) {
        count += 1;
        distance += activity.distance;
        totalElapsedTime += activity.elapsed_time;
      }
    }

    return (
      <div className={dashboardStyles.statBox}>
        <div className={dashboardStyles.statRow}>
          <h2>{convertCamelCaseToWords(title)}</h2>
          <p>{count}</p>
          <p>{distance === 0 ? 'N/A' : metersToKilometers(distance) + 'KM'}</p>
          <p>{totalElapsedTime === 0 ? 'N/A' : formatTime(totalElapsedTime)}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default StatsBox;
