import React, { useState, useEffect } from 'react';
import '../styles/clickSpeedScreen.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {colors} from "../styles/colors";
import {users} from "../data/userData";

var clickSpeed;
const ClickSpeedCounter = ({ clicks, time }) => {

  clickSpeed = clicks / time || 0;

  return (
    <div className="click-speed-container">
      <p style={{color: '#FF7B91'}}><span className="click-speed">CPS </span>{clickSpeed.toFixed(2)}</p>
    </div>
  );
};

const ClickSpeedScreen = () => {
    const {state} = useLocation();
    if(state){
        var {name} = state;
        if(name===undefined){
            name="Anonymous";
        }}else{
        name="Anonymous";
    }
    const [logoutHover, setLogoutHover] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(10);
  const navigate = useNavigate(); // Initialize useHistory hook

    const submitresult = async (score) => {
        var test="ClickSpeed";
        const response = await fetch('http://localhost:5000/ClickSpeed', {
            method: "post",
            body: JSON.stringify({ name, score, test}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert("Score submitted successfully");
        navigate('/Home', {state: state} );
    }
  useEffect(() => {
    let timer;

    if (isGameActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsGameActive(false);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isGameActive, timeRemaining]);

  const handleStartClick = () => {
    setClickCount(0);
    setTimeRemaining(selectedTime);
    setIsGameActive(true);
  };

  const handleAreaClick = () => {
    if (isGameActive) {
      setClickCount((prevCount) => prevCount + 1);
    }
  };

  const handleRestartClick = () => {
    setClickCount(0);
    setTimeRemaining(selectedTime);
    setIsGameActive(false);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    // Optionally, you can reset the game when the user changes the time
    setClickCount(0);
    setTimeRemaining(value);
    setIsGameActive(false);
  };

  const handleHomeButtonClick = () => {
      navigate('/Home', {state: state} ); // Navigate to the home screen when headerIcon is clicked
  };

  const styles = {
    parentContainer: {
      boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
      backgroundColor: '#3A424F',
      color: '#00AEEF',
      padding: 30,
      height: 450,
      width: 650,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 65,
      borderRadius: 15,
    },
    headerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 15,
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
  }

  return (
    <div className='click-counter-container'>
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
      {/* <a href="/" style={{ textDecoration: 'none' }}> */}
        <div id="homeIcon" style={styles.headerContainer} onClick={handleHomeButtonClick}>
        <img
        src={require('../assets/icons/logo.png')}
        style={{height: 78, width: 'auto'}}
        />
        </div>
      {/* </a> */}

      <img
        src={require('../assets/icons/mouse.png')}
        style={{width: 100, height: 100, marginTop: -50, marginBottom: 25}}
      />

      <div className="duration-dropdown-container">
        <div>
          {'Select duration'}
          {/* <select className="time-dropdown" value={selectedTime} onChange={handleTimeChange}>
            <option value={5}>5 s</option>
            <option value={10}>10 s</option>
            <option value={15}>15 s</option>
            <option value={30}>30 s</option>
          </select> */}
        </div>

          <div className="duration-sel">
            {/* <div className="duration-sel-buttons"> */}
              <button className="duration-sel-btn" onClick={() => handleTimeChange(5)}>5 s</button>
              <button className="duration-sel-btn" onClick={() => handleTimeChange(10)}>10 s</button>
              <button className="duration-sel-btn" onClick={() => handleTimeChange(15)}>15 s</button>
              <button className="duration-sel-btn" onClick={() => handleTimeChange(30)}>30 s</button>
            {/* </div> */}
          </div>
      </div>

      <div className="click-stats">
        <p style={{color: '#FF7B91'}}><span className="time-remaining">Time </span>{timeRemaining} s</p>
        <ClickSpeedCounter clicks={clickCount} time={selectedTime - timeRemaining} />
        <p style={{color: '#FF7B91'}}><span className="click-count">Clicks </span>{clickCount}</p>
      </div>

      {isGameActive ? (
        <div className="click-area" onClick={handleAreaClick}>
          <p className="click-here-text">CLICK HERE</p>
        </div>
      ) : (
        <div className="button-container">
          {clickCount > 0 ? (
            <div>
              <button className="restart-button" onClick={handleRestartClick}>
                <img
                style={{width: 25, height: 25, marginRight: 10}}
                src={require('../assets/icons/replay.png')}
                />
                Replay
              </button>
                <button className="restart-button" onClick={()=>{submitresult(clickSpeed);}}>
                    <img
                        style={{width: 25, height: 25, marginRight: 10}}
                    />
                    Submit
                </button>
            </div>
          ) : (
            <button className="start-button" onClick={handleStartClick}>
              <img
              style={{width: 28, height: 28, marginRight: 10}}
              src={require('../assets/icons/start-grey.png')}
              />
              Start
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClickSpeedScreen;
