import styles from '../styles/Navbar.module.css';


import React from 'react';

export default function ChevronLeft() {
  return (
    <div className={styles.chevronLeft}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </div>
  );
}