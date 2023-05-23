import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import homeStyles from '../styles/Home.module.css';
import loaderStyles from '../styles/Loader.module.css';
import Layout from '../components/Global/Layout';
import StravaAuthorisation from '../helper_functions/Requests/Authorisation';
import fetchAthleteData from '../helper_functions/Requests/FetchAthlete';
import fetchActivities from '../helper_functions/Requests/FetchActivities';
import { useRouter } from 'next/router';
import Loader from '../Icons/Loader';
import Link from 'next/link';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function MyApp({ Component }) {
  const [accessToken, setAccessToken] = useState(null);
  const [athleteData, setAthleteData] = useState({});
  const [activities, setActivities] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const router = useRouter();

  const mode = 'dev';

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle sign out by resetting the access token state
  const signOutHandler = () => {
    setAccessToken(null);
    localStorage.clear()
    router.push('/signout');
  };

  const fetchAthleteDataReturn = async (accessToken) => {
    // Fetch athlete data using the access token
    const data = await fetchAthleteData(accessToken);
    return data;
  };

  const fetchAllActivities = async (accessToken) => {
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

  // Run OAuth if access token is null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await StravaAuthorisation();
        setAccessToken(token);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    if (!accessToken) {
      fetchData();
    }
  }, [accessToken]);

  // Get all data if access token is not null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAthleteDataReturn(accessToken);
        setAthleteData(data);

        const activityData = await fetchAllActivities(accessToken);
        setActivities(activityData);
      } catch (error) {
        console.log('Error fetching athlete data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);


  if (!accessToken) {
    let redirect_uri = '';

    if (mode === 'prod') {
      redirect_uri = 'https://friendly-daffodil-a99ceb.netlify.app';
    } else {
      redirect_uri = 'http://localhost:3000';
    }

    return (
      <div className={homeStyles.container}>
        <main>
          <div className={homeStyles.card}>
            <div className={homeStyles.title}>Welcome to StravaConnect</div>
            <Link
              href={`https://www.strava.com/oauth/authorize?client_id=97178&redirect_uri=${redirect_uri}&response_type=code&scope=read,activity:read_all,activity:write,profile:read_all`}
            >
              <button className={homeStyles.btn}>Login with Your Strava Account</button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (athleteData === 'requestLimit') {
    return (
      <div className={homeStyles.container}>
        <h1>Request Limit has been reached.</h1>
        <p>This is a trial app with a 1000 requests limit per day and 100 requests every 15 minutes.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={loaderStyles.newcontainer}>
        <div className={loaderStyles.loadingText}>Loading Dashboard</div>
        <div className={loaderStyles.loaderContainer}>
          <div className={loaderStyles.loading}>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout
        accessToken={accessToken}
        signOut={signOutHandler}
        isLoading={isLoading}
        athleteData={athleteData}
        activities={activities}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        fetchAllActivities={fetchAllActivities}
      >
        <Component accessToken={accessToken}
        signOut={signOutHandler}
        isLoading={isLoading}
        athleteData={athleteData}
        activities={activities}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        fetchAllActivities={fetchAllActivities} />
      </Layout>
    </LocalizationProvider>
  );
}

export default MyApp;
