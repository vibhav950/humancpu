import React, { useState } from 'react';
import { users } from '../data/userData';
import TestSelectionCards from '../components/TestSelectionCards';

const GREY_COLOR = '#DBE2E9'

export default function HomeScreen() {
  const [priofileSubTextHover, setProfileSubTextHover] = useState(false);

  const styles = {
    rootContainer: {
        padding: 10,
    },
    headerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
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
        backgroundColor: GREY_COLOR,
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
        fontSize: 22,
        fontWeight: '600'
    },
    profileSubText: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 12,
        fontWeight: '500',
        color: '#F4364C',
        cursor: 'pointer',
        textDecoration: priofileSubTextHover ? 'underline' : 'none'
    },
    
  };

  return (
    <div id="root" style={styles.rootContainer}>
      <div id="header" style={styles.headerContainer}>
        <div style={styles.headerText}>HumanCPU</div>
      </div>

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

      <TestSelectionCards/>
    </div>
  );
}
 