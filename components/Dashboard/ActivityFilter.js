import React from 'react';
import dashboardStyles from '../../styles/Dashboard.module.css';

const ActivityFilter = ({ selectedActivity, handleActivityChange }) => {
  return (
    <div className={dashboardStyles.filterContainer}>
      <label htmlFor="activityFilter">Filter by Activity</label>
      <select
        id="activityFilter"
        className={dashboardStyles.activityFilter}
        value={selectedActivity}
        onChange={handleActivityChange}
      >
        <option value="All">All</option>
        <option value="Run">Run</option>
        <option value="Ride">Ride</option>
        <option value="Swim">Swim</option>
        <option value="WeightTraining">Weight Training</option>
        {/* Add more activity options as needed */}
      </select>
    </div>
  );
};

export default ActivityFilter;