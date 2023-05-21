import '../styles/globals.css';
import homeStyles from '../styles/Home.module.css';
import loaderStyles from '../styles/Loader.module.css';
import Layout from '../components/Global/Layout';
import StravaAuthorisation from '../helper_functions/Requests/Authorisation';
import fetchAthleteData from '../helper_functions/Requests/FetchAthlete';
import fetchAthleteStats from '../helper_functions/Requests/FetchAthleteStats';
import fetchActivities from '../helper_functions/Requests/FetchActivities';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '../Icons/Loader';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null);
  const [athleteData, setAthleteData] = useState({});
  const [athleteStats, setAthleteStats] = useState({});
  const [activities, setActivities] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Handle sign out by removing access token from local storage
  const signOutHandler = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    router.push('/signout');
  };

  const fetchAthleteDataReturn = async (accessToken) => {
    // Fetch athlete data using the access token
    const data = await fetchAthleteData(accessToken);

    return data;
  };

  const fetchAthleteStatsReturn = async (accessToken, athleteId) => {
    // Fetch athlete stats using the access token and athlete ID
    const stats = await fetchAthleteStats(accessToken, athleteId);

    return stats;
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
        localStorage.setItem('athleteData', JSON.stringify(data));

        if (data) {
          const stats = await fetchAthleteStatsReturn(accessToken, data.id);
          setAthleteStats(stats);
          localStorage.setItem('athleteStats', JSON.stringify(stats));
        }

        const activityData = await fetchAllActivities(accessToken);
        setActivities(activityData);
        localStorage.setItem('activityData', JSON.stringify(activityData));
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
    

  // if user is redirected from Strava OAuth link, get access token from local storage
  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath);
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);

    if (urlParams.has('state')) {
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken]);

  // if access token is null, show connect page
  if (!accessToken) {
    return (
      <div className={homeStyles.container}>
        <main>
          <div className={homeStyles.card}>
            <div className={homeStyles.title}>Welcome to StravaConnect</div>
            <Link
              href={`https://www.strava.com/oauth/authorize?client_id=97178&redirect_uri=https://friendly-daffodil-a99ceb.netlify.app&response_type=code&scope=read,activity:read_all,activity:write,profile:read_all`}
            >
              <button className={homeStyles.btn}>Login with Your Strava Account</button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // if request limit is reached, display message
  if (athleteData === 'requestLimit') {
    return (
      <div className={homeStyles.container}>
        <h1>Request Limit has been reached.</h1>
        <p>This is a trial app with a 1000 requests limit per day and 100 requests every 15 minutes.</p>
      </div>
    );
  }

  // if data is loading, show loading screen
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

  // if all criteria are met, load main dashboard
  return (
    <Layout
      accessToken={accessToken}
      signOut={signOutHandler}
      isLoading={isLoading}
      athleteData={athleteData}
      athleteStats={athleteStats}
      activities={activities}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
