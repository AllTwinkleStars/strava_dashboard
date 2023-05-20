const fetchAthleteDetails = async (accessToken, activityId) => {
  try {
    const response = await fetch(`https://www.strava.com/api/v3/activities/${activityId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const athleteData = await response.json();
      return athleteData;
    }
    if (response.status === 429) {
      return 'requestLimit'
    }
    else {
      console.log('Error fetching athlete data from Strava:', response.status);
    }
  } catch (error) {
    console.log('Error fetching athlete data:', error);
  }
};

export default fetchAthleteDetails;
