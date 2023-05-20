import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import { formatDate, metersToKilometers, formatTime } from '../../../helper_functions/helper';
import Image from 'next/image';
import { getImageSrc } from '../../../helper_functions/helper';

const LastActivityRow = ({ lastActivity, selectedActivity }) => {
  console.log(lastActivity)
  if (lastActivity) {
    return (
      <div className={dashboardStyles.lastActivityRow}>
        <div className={dashboardStyles.lastActivityStatImage}>
          <Image
            src={getImageSrc(lastActivity.sport_type)}
            width={32}
            height={32}
            alt="sport type"
          />
        </div>
        <div className={dashboardStyles.lastActivityStat}>
          {lastActivity.name}
        </div>
        <div className={dashboardStyles.lastActivityStat}>
          {formatDate(lastActivity.start_date_local)}
        </div>
        {lastActivity.distance !== 0 ? (
          <div className={dashboardStyles.lastActivityStat}>
            {metersToKilometers(lastActivity.distance)}KM
          </div>
        ) : null}
        <div className={dashboardStyles.lastActivityStat}>
          {formatTime(lastActivity.elapsed_time)}
        </div>
      </div>
    );
  } else {
    return <p>No activity found.</p>;
  }
};

export default LastActivityRow;