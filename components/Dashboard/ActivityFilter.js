import React from 'react';
import dashboardStyles from '../../styles/Dashboard.module.css';
import { Select, MenuItem } from '@mui/material';
import { convertCamelCaseToWords } from '../../helper_functions/helper'

const ActivityFilter = ({ selectedActivity, handleActivityChange, activities }) => {
  const uniqueActivities = [...new Set(activities.map((activity) => activity.sport_type))];

  const sortedActivities = uniqueActivities.sort((a, b) => a.localeCompare(b));

  const activityOptions = sortedActivities.map((activity) => (
    <MenuItem key={activity} value={activity}>
      {convertCamelCaseToWords(activity)}
    </MenuItem>
  ));

  return (
    <div className={dashboardStyles.filterContainer}>
      <label htmlFor="activityFilter">Filter by Activity</label>
      <Select
        id="activityFilter"
        className={dashboardStyles.activityFilter}
        value={selectedActivity}
        onChange={handleActivityChange}
      >
        <MenuItem value="All">All</MenuItem>
        {activityOptions}
      </Select>
    </div>
  );
};

export default ActivityFilter;