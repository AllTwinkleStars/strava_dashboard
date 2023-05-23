import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from '../../../styles/BarChart.module.css';
import { Chart, ArcElement } from 'chart.js';
import {convertCamelCaseToWords} from '../../../helper_functions/helper'

Chart.register(ArcElement);

const DonutChart = ({ selectedActivity, activities }) => {
  if (activities) {

    let counts = {};

    for (let activity of activities) {
      const activityType = activity.sport_type;
      if (!counts[activityType]) {
        counts[activityType] = { count: 0 };
      }
      if (selectedActivity === 'All' || activityType === selectedActivity) {
        counts[activityType].count++;
      }
    }

    if (activities) {
      let labels = Object.keys(counts);
      const countsArray = Object.values(counts);
      const colors = ['#fc5200', '#ffaa00', '#ab26e5', '#0099ff', '#4f5eee', '#2ad838', '#ffffff'];

      if (selectedActivity !== 'All') {
        labels = labels.filter((label) => label === selectedActivity);
      }

      const formattedLabels = []

      for (let label of labels) {
        const formattedLabel = convertCamelCaseToWords(label)
        formattedLabels.push(formattedLabel)
      }

      const chartData = {
        labels: formattedLabels,
        datasets: [
          {
            data: countsArray.map((count) => count.count),
            backgroundColor: colors.slice(0, labels.length),
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
          tooltip: {
            displayColors: false, // Hide color indicators in tooltip
          backgroundColor: '#2d3236', // Set tooltip background color
          borderColor: '#fc5200', // Set tooltip border color
          borderWidth: 1, // Set tooltip border width
          cornerRadius: 4, // Set tooltip corner radius
          padding: 8, // Set tooltip padding
          titleFont: { size: 14, weight: 'bold' }, // Set tooltip title font
          bodyFont: { size: 12 }, // Set tooltip body font
          bodySpacing: 4, // Set spacing between tooltip body elements
          bodyAlign: 'center', // Set alignment of tooltip body elements
          caretPadding: 8, // Set padding around tooltip caret
          }
        },
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow chart to adjust height
        height: 100,
      };

      if (labels.length === 0) {
        return (
          <div className={styles.doughnutContainer}>
            <p>No events found.</p>
          </div>
        );
      }

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
