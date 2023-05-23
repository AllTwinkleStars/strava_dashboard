import React from "react";
import Navbar from '../Global/Navbar';

const Layout = ({ children, accessToken, signOut, athleteData, activities, toggleTheme, isDarkMode, fetchAllActivities }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        athleteData: athleteData,
        activities: activities,
        isDarkMode: isDarkMode,
        fetchAllActivities: fetchAllActivities
      });
    }
    return child;
  });

  return (
    <>
      <Navbar signOut={signOut} athlete={athleteData} accessToken={accessToken} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      {childrenWithProps}
    </>
  );
};

export default Layout;
