import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from '../../../styles/BarChart.module.css';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const DonutChart = ({ selectedActivity }) => {
  const storedActivityData = localStorage.getItem('athleteStats');
  if (storedActivityData) {
    const parsedActivityData = JSON.parse(storedActivityData);

    let activityData = null;
    if (selectedActivity === 'All') {
      activityData = {
        runCount: parsedActivityData.all_run_totals.count,
        rideCount: parsedActivityData.all_ride_totals.count,
        swimCount: parsedActivityData.all_swim_totals.count,
      };
    } else {
      const selectedActivityData = parsedActivityData[
        `all_${selectedActivity.toLowerCase()}_totals`
      ];
      if (selectedActivityData) {
        activityData = {
          [selectedActivity.toLowerCase() + 'Count']: selectedActivityData.count,
        };
      }
    }

    if (activityData) {
      const { runCount, rideCount, swimCount } = activityData;

      const colors = ['#fc5200', '#ffcc00', '#0099ff'];

      const chartData = {
        labels: ['Run', 'Ride', 'Swim'],
        datasets: [
          {
            data: [runCount, rideCount, swimCount],
            backgroundColor: colors,
          },
        ],
      };

      const options = {
        borderWidth: 0,
        plugins: {
          title: {
            display: true,
            padding: { top: 5, bottom: 20 },
            color: '#fff',
            text: 'Activities Count by Sport',
            font: {
              size: 24,
            },
          },
        },
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow chart to adjust height
        height: 100,
      };

      return (
        <div className={styles.doughnutContainer}>
          <Doughnut data={chartData} options={options} />
        </div>
      );
    }
  }

  return null;
};

export default DonutChart;
