import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styles from '../styles/UploadForm.module.css';
import { activityImages } from '../components/Global/ActivityImages'; // Update the import path
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const UploadActivity = ({ accessToken, fetchAllActivities }) => {
  const router = useRouter();

  const [activityData, setActivityData] = useState({
    name: '',
    sport_type: '',
    start_date_local: null,
    elapsed_time: '',
    description: '',
    distance: 'Distance (Km)',
    trainer: 0,
    commute: 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable

  const handleRefreshClick = async () => {
    const refreshedActivities = await fetchAllActivities(accessToken);
    if (refreshedActivities) {
      console.log(refreshedActivities)
      router.push('/')
    }
    else {
      console.log('error')
    }
  }

  useEffect(() => {
    const isRequiredFieldsFilled =
      activityData.name &&
      activityData.sport_type &&
      activityData.start_date_local &&
      activityData.elapsed_time;

    setIsFormValid(isRequiredFieldsFilled);
  }, [activityData]);

  const handleDateChange = (date) => {
    setActivityData((prevData) => ({
      ...prevData,
      start_date_local: date,
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
    const [hours, minutes] = activityData.elapsed_time.split(':');
    const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;

    // Perform upload to Strava using the activityData
    // You can use a library like axios or fetch to make the API request
    // Example code:
    const requestBody = {
      ...activityData,
      start_date_local: dayjs(activityData.start_date_local).toISOString(),
      elapsed_time: totalSeconds,
    };

    if (distanceInMeters !== null) {
      requestBody.distance = distanceInMeters;
    }

    fetch('https://www.strava.com/api/v3/activities', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response from Strava
        console.log(data);
        setIsSubmitted(true); // Set the submitted state to true
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm" className='container'>
      <div className={styles.formContainer}>
        <Typography variant="h4">Upload Activity to Strava</Typography>
        {!isSubmitted ? ( // Render the form if not submitted
          <form className={styles.formWrapper} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formColumn}>
                <TextField
                  type="text"
                  label="Activity Name"
                  name="name"
                  value={activityData.name}
                  onChange={handleInputChange}
                  required
                />
                <DateTimePicker // Updated component
                  label="Start Date/Time"
                  onChange={handleDateChange}
                  format="DD/MM/YYYY HH:mm"
                  required
                />
              </div>
              <div className={styles.formColumn}>
                <FormControl>
                  <InputLabel>Sport Type</InputLabel>
                  <Select
                    value={activityData.sport_type}
                    name="sport_type"
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    {activityImages.map((image) => (
                      <MenuItem key={image.sportType} value={image.sportType}>
                        {image.sportType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  type="text"
                  label="Elapsed Time"
                  name="elapsed_time"
                  value={activityData.elapsed_time}
                  onChange={handleInputChange}
                  placeholder='HH:MM:SS'
                  required
                />
                <TextField
                  type="text"
                  label="Description"
                  name="description"
                  value={activityData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </div>
              <div className={styles.formColumn}>
                {!['Workout', 'WeightTraining'].includes(activityData.sport_type) && (
                  <TextField
                    type="number"
                    label="Distance (Km)"
                    name="distance"
                    value={activityData.distance}
                    onChange={handleInputChange}
                  />
                )}
                <FormControl>
                  <InputLabel>Trainer</InputLabel>
                  <Select
                    value={activityData.trainer}
                    name="trainer"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={0}>No</MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Commute</InputLabel>
                  <Select
                    value={activityData.commute}
                    name="commute"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={0}>No</MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
              Upload
            </Button>
          </form>
        ) : (
          // Render the completion message if submitted
          <div className={styles.completionMessage}>
            <Typography variant="h5">Activity Uploaded Successfully!</Typography>
            <Typography variant="body1">Thank you for uploading the activity.</Typography>
            <Button onClick={handleRefreshClick}>
              refresh data and return to dashboard
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default UploadActivity;
