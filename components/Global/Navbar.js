import navbarStyles from '../../styles/Navbar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Logout from '../../Icons/logout';
import User from '../../Icons/User';
import { useRouter } from 'next/router';
import Menu from '../../Icons/Menu';
import Close from '../../Icons/Close'

const Navbar = (props) => {
  const { athlete } = props;

  const router = useRouter();
  const url = router.route;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (props.accessToken) {
    return (
      <nav className={`${navbarStyles.navigation} ${isDarkMode ? navbarStyles.dark : navbarStyles.light}`}>
        <ul className={navbarStyles.navullist}>
          <li className={navbarStyles.logo}>
            <Link href='/'>
              STRAVA
              <span className={navbarStyles.connect}>CONNECT</span>
            </Link>
          </li>
          <div className={navbarStyles.rightLinks}>
            <div className={navbarStyles.linkItems}>
              <li className={navbarStyles.linkItem}>
                <Link className={(url === '/' ? navbarStyles.active : '')} href="/">
                  Dashboard
                </Link>
                <Link className={(url === '/activities' ? navbarStyles.active : '')} href="/activities">
                  All Activities
                </Link>
                <Link className={(url === '/uploadactivity' ? navbarStyles.active : '')} href="/uploadactivity">
                  Upload an Activity
                </Link>
              </li>
            </div>
            <div className={navbarStyles.themeSwitch}>
              <input
                type="checkbox"
                id="themeSwitch"
                className={navbarStyles.themeSwitch}
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <label htmlFor="themeSwitch" className={navbarStyles.themeSwitchLabel}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </label>
            </div>

            <div className={navbarStyles.dropdown}>
              <Link href='/profile'>
                <div className={navbarStyles.dropdownButton}>
                  <div className={navbarStyles.name}>
                    {athlete.firstname + ' '}
                    {athlete.lastname}
                  </div>
                  <img className={navbarStyles.profileImg} src={athlete.profile} />
                </div>
              </Link>
              <div className={navbarStyles.dropdownContent}>
                <Link className={navbarStyles.dropdownItem} href="/profile">
                  <div className={navbarStyles.dropdownItemText}>My Profile</div>
                  <User />
                </Link>
                <Link className={navbarStyles.dropdownItem} href="/" onClick={props.signOut}>
                  <div className={navbarStyles.dropdownItemText}>Sign Out</div>
                  <Logout />
                </Link>
              </div>
            </div>
          </div>
          <div onClick={toggleMobileMenu} className={!isMobileMenuOpen ? navbarStyles.menu : navbarStyles.hidden}>
            <Menu />
          </div>
          <div onClick={closeMobileMenu} className={isMobileMenuOpen ? navbarStyles.close : navbarStyles.hidden}>
            <Close />
          </div>
          <div className={isMobileMenuOpen ? `${navbarStyles.mobileMenu} ${navbarStyles.slideIn}` : navbarStyles.hidden}>
            <div className={navbarStyles.mobileLinkItems}>
              <Link onClick={closeMobileMenu} className={navbarStyles.mobileDropdownItem} href="/">
                Dashboard
              </Link>
              <Link onClick={closeMobileMenu} className={navbarStyles.mobileDropdownItem} href="/activities">
                All Activities
              </Link>
              <Link onClick={closeMobileMenu} className={navbarStyles.mobileDropdownItem} href="/">
                Upload an Activity
              </Link>
              <Link onClick={closeMobileMenu} className={navbarStyles.mobileDropdownItem} href="/profile">
                My Profile
              </Link>
              <Link className={navbarStyles.mobileDropdownItem} href="/" onClick={props.signOut}>
                Sign Out
              </Link>
            </div>
          </div>
        </ul>
      </nav>
    );
  }
}

export default Navbar;