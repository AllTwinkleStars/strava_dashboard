import React from 'react';
import dashboardStyles from '../../../styles/Dashboard.module.css';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import DonutChart from '../Charts/DoughnutChart';

const ChartRow = ({ selectedActivity }) => {
  return (
    <div className={dashboardStyles.boxContainer}>
        <BarChart selectedActivity={selectedActivity} />
        <LineChart selectedActivity={selectedActivity} />
        <DonutChart selectedActivity={selectedActivity} />
      </div>
  )
}

export default ChartRow
