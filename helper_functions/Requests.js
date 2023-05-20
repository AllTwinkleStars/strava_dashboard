export const fetchAthleteDataReturn = async (accessToken) => {
    // Fetch athlete data using the access token
    const data = await fetchAthleteData(accessToken);

    return data;
};

export const fetchAthleteStatsReturn = async (accessToken, athleteId) => {
    // Fetch athlete stats using the access token and athlete ID
    const stats = await fetchAthleteStats(accessToken, athleteId);

    return stats;
};

export const fetchAllActivities = async (accessToken) => {
    const perPage = 100; // Set the desired number of activities per page
    let page = 1;
    let allActivities = [];

    while (true) {
        const activities = await fetchActivities(accessToken, page, perPage);
        if (activities && activities.length > 0) {
            allActivities.push(...activities);
            page++;
        } else {
            break; // Break the loop when an empty page is returned
        }
    }

    return allActivities;
};