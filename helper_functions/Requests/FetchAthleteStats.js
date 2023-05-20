const fetchAthleteStats = async (accessToken, id) => {
  try {
    const response = await fetch(`https://www.strava.com/api/v3/athletes/${id}/stats`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const athleteStatsData = await response.json();
      return athleteStatsData;
    } else {
      console.log('Error fetching athlete data from Strava:', response.status);
      return null;
    }
  } catch (error) {
    console.log('Error fetching athlete data:', error);
    return null;
  }
};

export default fetchAthleteStats;
