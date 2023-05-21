import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, accessToken, signOut, athleteData, athleteStats, activities, refreshData }) => {
    return (
      <div>
        <Navbar signOut={signOut} athlete={athleteData} accessToken={accessToken} />
        {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          athleteData: athleteData,
          athleteStats: athleteStats,
          activities: activities,
          refreshData: refreshData
        });
      })}
      </div>
    );
  }
  
  export default Layout;