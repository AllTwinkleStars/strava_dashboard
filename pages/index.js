import Dashboard from './dashboard';

const Home = (props) => {
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

export default Home;