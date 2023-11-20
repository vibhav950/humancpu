import React, { useState } from 'react';
import { users } from '../data/userData';
import SelectionCards from '../components/SelectionCards';
import { colors } from '../styles/colors';
import {useLocation, useNavigate} from "react-router-dom";

export default function HomeScreen() {

  const [logoutHover, setLogoutHover] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log(state);
    if(state){
    var {name} = state;
    if(name===undefined){
        name="Anonymous";
    }}else{
        name="Anonymous";
    }
  const styles = {
    rootContainer: {
        padding: 10,
        margin: 15,
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
    },
    mainLogo: {
      height: 78,
      widhth: 'auto',
    },
    logoutBtn: {
      border: 0,
      backgroundColor: '#00AEEF',
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      padding: '12px 15px',
      marginTop: '20px',
      marginLeft: '-110px',
      borderRadius: '10px',
      alignItems: 'center',
      width: 50,
      height: 4,
      display: 'flex',
      justifyContent: 'space-around',
      boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
      paddingBottom: '9px'
    }
  };

  return (
    <div id="root" style={styles.rootContainer}>

      <div id="header" style={styles.headerContainer}>
        <img
        src={require('../assets/icons/logo.png')}
        style={styles.mainLogo}
        />
      </div>

      <div id="profileContainer" style={styles.profileContainer} onClick={() => {navigate('/Leaderboard', {state: state});}}>
        <div
        style={styles.profileText}
        >
            {name.length > 7 ? name.slice(0, 7) + '...' : name}
        </div>
        <button
        style={{
          ...styles.logoutBtn,
          backgroundColor: logoutHover ? colors.RED : 'grey'
          }}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
        onClick={(event) => {event.stopPropagation();navigate('/');}}
        >
          Logout
        </button>
        <img
          style={styles.profileImage}
          src={users[0].profileIcon}
          alt="Profile"
        />
      </div>

      <SelectionCards name={name}/>
    </div>
  );
}
 