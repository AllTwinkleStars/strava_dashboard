import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Title, CategoryScale, LinearScale, PointElement, Tooltip, LineController, LineElement } from 'chart.js';
import styles from '../../../styles/BarChart.module.css';

Chart.register(Title, CategoryScale, LinearScale, PointElement, Tooltip, LineController, LineElement);

const LineChart = ({ selectedActivity }) => {
  const storedActivityData = localStorage.getItem('activityData');
  if (storedActivityData) {
    const activities = JSON.parse(storedActivityData);

    const currentYear = new Date().getFullYear();
    const filteredActivities = selectedActivity === 'All'
      ? activities.filter(activity => new Date(activity.start_date_local).getFullYear() === currentYear)
      : activities.filter(activity => new Date(activity.start_date_local).getFullYear() === currentYear && activity.sport_type === selectedActivity);

    const activityCounts = filteredActivities.reduce((counts, activity) => {
      const month = activity.start_date_local.slice(0, 7); // Extract year and month (format: "YYYY-MM")
      counts[month] = (counts[month] || 0) + 1; // Increment activity count for the month
      return counts;
    }, {});

    const labels = Object.keys(activityCounts).reverse();
    const data = Object.values(activityCounts).reverse();

    const highestCount = Math.max(...data); // Get the highest count among all months

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Activities',
          data,
          fill: false,
          borderColor: '#fc5200',
          borderWidth: 2,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          suggestedMin: 0, // Start y-axis at 0
          suggestedMax: highestCount, // Set suggested maximum to the highest count among all months
        },
      },
      plugins: {
        title: {
          display: true,
          padding: { top: 5, bottom: 20 },
          color: '#fff',
          text: 'Activities Year to Date',
          font: {
            size: 24,
          },
        },
        legend: {
          display: false,
        },
      },
    };

    return (
      <div className={styles.lineContainer}>
        <Line data={chartData} options={options} />
      </div>
    );
  }

  return null;
};

export default LineChart;
