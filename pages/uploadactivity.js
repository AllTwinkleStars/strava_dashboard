import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/UploadForm.module.css';
import { format, parseISO, differenceInSeconds } from 'date-fns';

const UploadActivity = () => {
  const AccessToken = localStorage.getItem('accessToken');
  const [activityData, setActivityData] = useState({
    name: '',
    sport_type: '',
    start_date_local: '',
    elapsed_time: '',
    description: '',
    distance: 'Distance (Km)',
    trainer: 0,
    commute: 0,
  });
  const [startDate, setStartDate] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isRequiredFieldsFilled =
      activityData.name &&
      activityData.sport_type &&
      activityData.start_date_local &&
      activityData.elapsed_time;

    setIsFormValid(isRequiredFieldsFilled);
  }, [activityData]);

  const handleDateChange = (date) => {
    setStartDate(date);
    const formattedDate = format(date, 'dd/MM/yyyy');
    setActivityData((prevData) => ({
      ...prevData,
      start_date_local: date.toISOString(),
      formatted_date: formattedDate,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activityData.sport_type === '') {
      // No sport type selected, prevent form submission
      return;
    }

    // Convert distance to meters as a float
    const distanceInMeters =
      activityData.sport_type === 'Workout' || activityData.sport_type === 'WeightTraining'
        ? null
        : parseFloat(activityData.distance) * 1000;

    // Convert elapsed_time to seconds
    const [hours, minutes, seconds] = activityData.elapsed_time.split(':');
    const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

    // Perform upload to Strava using the activityData
    // You can use a library like axios or fetch to make the API request
    // Example code:
    const requestBody = {
      ...activityData,
      start_date_local: parseISO(activityData.start_date_local),
      elapsed_time: totalSeconds,
    };

    if (distanceInMeters !== null) {
      requestBody.distance = distanceInMeters;
    }

    fetch('https://www.strava.com/api/v3/activities', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response from Strava
        console.log(data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Upload Activity to Strava</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Activity Name (e.g. Morning Run)"
              name="name"
              value={activityData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <select
              placeholder="Sport Type"
              name="sport_type"
              value={activityData.sport_type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Run">Run</option>
              <option value="Ride">Ride</option>
              <option value="Swim">Swim</option>
              <option value="WeightTraining">Weight Training</option>
              <option value="Workout">Workout</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              placeholderText="Start Date (dd/mm/yyyy)"
              dateFormat="dd/MM/yyyy"
              className={styles.datePicker}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Elapsed Time (hh:mm:ss)"
              name="elapsed_time"
              value={activityData.elapsed_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              placeholder="Description"
              name="description"
              value={activityData.description}
              onChange={handleInputChange}
            />
          </div>
          {!['Workout', 'WeightTraining'].includes(activityData.sport_type) && (
            <div className={styles.formGroup}>
              <input
                type="number"
                placeholder="Distance (Km)"
                name="distance"
                value={activityData.distance}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <select name="trainer" value={activityData.trainer} onChange={handleInputChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <select name="commute" value={activityData.commute} onChange={handleInputChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadActivity;
