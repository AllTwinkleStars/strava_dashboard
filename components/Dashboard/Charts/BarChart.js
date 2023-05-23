import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../../styles/BarChart.module.css';
import { formatDate, formatTime, metersToKilometers } from '../../../helper_functions/helper';
import { useRouter } from 'next/router';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ selectedActivity, activities }) => {;

  if (activities) {
    const filteredActivities = selectedActivity === 'All'
      ? activities
      : activities.filter(activity => activity.sport_type === selectedActivity);

    const first10Activities = filteredActivities.slice(0, 10); // Retrieve the first 10 activities

    const chartData = {
      labels: first10Activities.map((activity) => formatDate(activity.start_date_local)).reverse(),
      datasets: [
        {
          label: 'Elapsed Time',
          data: first10Activities.map((activity) => activity.elapsed_time).reverse(),
          backgroundColor: [
            '#fc5200',
            '#fc520095',
            '#fc520090',
            '#fc520085',
            '#fc520080',
            '#fc520075',
            '#fc520070',
            '#fc520065',
            '#fc520060',
            '#fc520055',
          ].reverse(),
        },
      ],
    };

    const router = useRouter();

    const handleBarClick = (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        const activityId = first10Activities[clickedIndex].id;
        router.push(`/activities/${activityId}`);
      }
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatTime(value),
            color: '#ffffff',
          },
        },
        x: {
          ticks: {
            color: '#ffffff',
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const index = context.dataIndex;
              const activity = first10Activities[index];
              const distance = metersToKilometers(activity.distance);
              const sportType = activity.sport_type === 'WeightTraining' ? 'Weight Training' : activity.sport_type;
              const distanceLabel = distance > 0 ? `Distance: ${distance}Km\n` : '';
              const tooltipLabels = [
                `Name: ${activity.name}`,
                `Sport Type: ${sportType}`,
                `Elapsed Time: ${formatTime(context.parsed.y)}`,
              ];

              if (distance > 0) {
                tooltipLabels.splice(2, 0, distanceLabel);
              }

              return tooltipLabels;
            },
          },
          displayColors: false, // Hide color indicators in tooltip
          backgroundColor: '#2d3236', // Set tooltip background color
          borderColor: '#fc5200', // Set tooltip border color
          borderWidth: 1, // Set tooltip border width
          cornerRadius: 4, // Set tooltip corner radius
          padding: 8, // Set tooltip padding
          titleFont: { size: 14, weight: 'bold' }, // Set tooltip title font
          bodyFont: { size: 12 }, // Set tooltip body font
          bodySpacing: 4, // Set spacing between tooltip body elements
          bodyAlign: 'left', // Set alignment of tooltip body elements
          caretPadding: 8, // Set padding around tooltip caret
        },
        title: {
          display: true,
          padding: { top: 5, bottom: 20 },
          color: '#fff',
          text: 'Last 10 Activities by Elapsed Time',
          font: {
            size: 24,
          },
        },
        legend: {
          display: false,
        },
      },
      onClick: handleBarClick, // Handle click events on bars
    };

    return (
      <div className={styles.chartContainer}>
        <Bar data={chartData} options={options} />
      </div>
    );
  }

  return null;
};

export default BarChart;
