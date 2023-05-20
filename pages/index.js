import Dashboard from './dashboard';

const Home = (props) => {
  if (props.athleteData && props.athleteStats) {
    return (
      <>
        <Dashboard
          athlete={props.athleteData}
          athleteStats={props.athleteStats}
          activities={props.activities}
        />
      </>
    );
  }
}

export default Home;