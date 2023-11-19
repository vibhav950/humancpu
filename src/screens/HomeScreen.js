import React, { useState } from 'react';
import { users } from '../data/userData';
import SelectionCards from '../components/SelectionCards';
import { colors } from '../styles/colors';

// const GREY_COLOR = '#808080'
// const GREY = '#3A424F';
// const SKY_BLUE = '#00AEEF';

export default function HomeScreen() {
  const [priofileSubTextHover, setProfileSubTextHover] = useState(false);

  const styles = {
    rootContainer: {
        padding: 10,
        margin: 15
    },
    headerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 15,
    },
    headerText: {
        color: '#808080',
        fontSize: 30,
        fontWeight: '600',
    },
    profileContainer: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        right: 0,
        width: 150,
        height: 45,
        borderRadius: 50,
        backgroundColor: colors.GREY,
        color: colors.SKY_BLUE,
        margin: 15,
        boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
    },
    profileImage: {
        // postion: 'relative',
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 5
    },
    profileText: {
        position: 'relative',
        marginLeft: 20,
        marginTop: -17.5,
        fontSize: 18,
        fontWeight: '600'
    },
    profileSubText: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15,
        fontWeight: '500',
        color: colors.RED,
        cursor: 'pointer',
        textDecoration: priofileSubTextHover ? 'underline' : 'none'
    },
    mainLogo: {
      height: 78,
      widhth: 'auto',
    },
  };

  return (
    <div id="root" style={styles.rootContainer}>

      <a href="/" style={{textDecoration: 'none'}}>
        <div id="header" style={styles.headerContainer}>
          <img
          src={require('../assets/icons/logo.png')}
          style={styles.mainLogo}
          />
        </div>
      </a>

      <div id="profileContainer" style={styles.profileContainer}>
        <div
        style={styles.profileText}
        >
            {users[0].name.length > 7 ? users[0].name.slice(0, 7) + '...' : users[0].name}
        </div>
        <div
        style={styles.profileSubText}
        onMouseEnter={() => setProfileSubTextHover(true)}
        onMouseLeave={() => setProfileSubTextHover(false)}
        onClick={() => {/* TODO: Logout */}}
        >
            {'Logout'}
        </div>
        <img
          style={styles.profileImage}
          src={users[0].profileIcon}
          alt="Profile"
        />
      </div>

      <SelectionCards/>
    </div>
  );
}
 