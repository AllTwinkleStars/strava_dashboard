const fetchActivities = async (accessToken, page = 1, perPage = 30) => {
  try {
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const activityData = await response.json();
      // console.log(activityData);
      return activityData;
    } else {
      console.log('Error fetching athlete data from Strava:', response.status);
      return null;
    }
  } catch (error) {
    console.log('Error fetching athlete data:', error);
    return null;
  }
};

export default fetchActivities;
