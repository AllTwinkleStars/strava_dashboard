import React from 'react';
import { Bubble } from 'react-chartjs-2';
import styles from '../../../styles/BarChart.module.css';
import { formatDate, formatTime, metersToKilometers } from '../../../helper_functions/helper';
import { useRouter } from 'next/router';


const BubbleChart = ({ selectedActivity, activities }) => {

    const router = useRouter();


    // Get the activities for the last 7 days
    const today = new Date(); // Current date and time
    today.setHours(23, 59, 59, 999); // Set the time to the end of the day
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const filteredActivities = activities.filter((activity) => {
        const activityDate = new Date(activity.start_date_local);
        if (selectedActivity === 'All') {
            return activityDate >= lastWeek && activityDate <= today;
        } else {
            return (
                activityDate >= lastWeek &&
                activityDate <= today &&
                activity.sport_type === selectedActivity
            );
        }
    });

    // Create an array of labels for the last 7 days (including the current day)
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const formattedDate = formatDate(date);
        labels.push(formattedDate);
    }

    // Create an object to store the total duration for each date
    const dateDurationMap = {};

    // Create an array of datasets for the bubble chart
    const datasets = [];
    for (const activity of filteredActivities) {
        const date = formatDate(new Date(activity.start_date_local));
        const duration = activity.elapsed_time;

        // Find the index of the activity's date in the labels array
        const index = labels.indexOf(date);

        // If the activity's date is within the last 7 days, create a bubble dataset
        if (index !== -1) {
            // Add the duration to the existing total for the date or initialize it
            dateDurationMap[date] = (dateDurationMap[date] || 0) + duration;

            const scalingFactor = 0.002; // Adjust the scaling factor as needed
            const totalDuration = dateDurationMap[date];

            const dataset = {
                label: date,
                data: [{ x: date, y: 1, r: totalDuration * scalingFactor }],
                backgroundColor: '#fc5200',
                borderColor: '#fc5200',
            };
            datasets.push(dataset);
        }
    }

    // Define the chart data
    const data = {
        datasets,
    };

    const handleBarClick = (event, elements) => {

        if (elements.length > 0) {
            const clickedIndex = elements[0].datasetIndex;
            const activityId = filteredActivities[clickedIndex].id;
            router.push(`/activities/${activityId}`);

        }
    };

    // Define the chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Adjusts the chart size based on container dimensions
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const datasetIndex = context.datasetIndex;
                        const dataIndex = datasetIndex;
                        const activity = filteredActivities[dataIndex];
                        const distance = metersToKilometers(activity.distance);
                        const sportType = activity.sport_type === 'WeightTraining' ? 'Weight Training' : activity.sport_type;
                        const startDate = formatDate(new Date(activity.start_date_local));
                        const distanceLabel = distance > 0 ? `Distance: ${distance}Km\n` : '';
                        const tooltipLabels = [
                            `Name: ${activity.name}`,
                            `Sport Type: ${sportType}`,
                            `Date: ${startDate}`
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
                text: 'Your Last 7 days',
                font: {
                    size: 24,
                },
            },
        },
        scales: {
            x: {
                type: 'category',
                labels,
                grid: {
                    display: true,
                },
            },
            y: {
                display: false, // Hide the y-axis
            },
        },
        onClick: handleBarClick,
    };

    return (
        <div className={styles.bubbleContainer}>
            <Bubble data={data} options={options} />
        </div>
    );

};

export default BubbleChart;
