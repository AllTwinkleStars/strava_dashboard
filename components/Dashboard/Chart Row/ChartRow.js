import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import DonutChart from '../Charts/DoughnutChart';

const ChartRow = ({ selectedActivity, activities }) => {
  return (
    <div className={dashboardStyles.boxContainer}>
        <BarChart selectedActivity={selectedActivity} activities={activities} />
        <LineChart selectedActivity={selectedActivity} activities={activities} />
        <DonutChart selectedActivity={selectedActivity} activities={activities} />
      </div>
  )
}

export default ChartRow
