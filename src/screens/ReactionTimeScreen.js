import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {colors} from "../styles/colors";
import {users} from "../data/userData";

export default function ReactionTimeScreen() {
    const [logoutHover, setLogoutHover] = useState(false);
    const {state} = useLocation();
    if(state){
        var {name} = state;
        if(name===undefined){
            name="Anonymous";
        }}else{
        name="Anonymous";
    }
    const [lights, setLights] = useState(['#36454F', '#36454F', '#36454F', '#36454F', '#36454F']);
    const [isActive, setIsActive] = useState(false);
    var [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);
    const [hover, setHover] = useState(false);
    const navigate = useNavigate(); // Initialize useHistory hook

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startTest = async () => {
        var i=0;
        setLights(['#36454F', '#36454F', '#36454F', '#36454F', '#36454F']);
        setIsActive(true);
        setStartTime(null);
        setReactionTime(null);

        // Turn on lights sequentially
        for (i = 0; i < 5; i++) {
            await sleep(1000);
            switch(i){
                case 0:
                    setLights(['red', '#36454F', '#36454F', '#36454F', '#36454F']);
                    break;
                case 1:
                    setLights(['red', 'red', '#36454F', '#36454F', '#36454F']);
                    break;
                case 2:
                    setLights(['red', 'red', 'red', '#36454F', '#36454F']);
                    break;
                case 3:
                    setLights(['red', 'red', 'red', 'red', '#36454F']);
                    break;
                case 4:
                    setLights(['red', 'red', 'red', 'red', 'red']);
                    break;
                default :
                    break;
            }
        }

        // Turn off lights after a random delay
        setTimeout(() => {
            setLights(['#36454F', '#36454F', '#36454F', '#36454F', '#36454F']);
            setIsActive(false);
            setStartTime(Date.now());
        }, Math.random() * 1000 + 1000); // Ensure a minimum delay of 1 second
    };

    const submitresult = async (score) => {
        var test="Reaction";
        const response = await fetch('http://localhost:5000/ReactionTime', {
            method: "post",
            body: JSON.stringify({ name, score, test}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const handleClick = () => {
        if (!isActive) {
            if (startTime !== null) {
                const endTime = Date.now();
                const currentReactionTime = endTime - startTime;
                setReactionTime(currentReactionTime);
                setStartTime(null);
                submitresult(currentReactionTime);
                return;
            }
            startTest();
        }
    };

    const handleHomeButtonClick = () => {
        navigate('/Home', {state: state} ); // Navigate to the home screen when headerIcon is clicked
      };

    const styles = {
        parentContainer: {
            boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
            // backgroundColor: '#3A424F',
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
        displayContainer: {
        },
        reactionTimeText: {
            fontSize: 32,
            fontWeight: '700'
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
        <div>
            <div id="profileContainer" style={styles.profileContainer}>
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
                    onClick={() => {navigate('/');}}
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
                style={{...styles.mainLogo, height: 78, width: 'auto'}}
                />
                </div>
            {/* </a> */}

            <div style={{...
                styles.parentContainer,
                backgroundColor : hover ? '#4C5667' : '#3A424F', 
                }}
                onClick={handleClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >   

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {lights.map((color, index) => (
                        <div
                            key={index}
                            style={{
                                width: '100px',
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'black',
                                margin: '10px',
                                borderRadius: '10px',
                            }}
                        >
                            <div
                                style={{
                                    marginTop: '20px',
                                    width: '65px',
                                    height: '65px',
                                    backgroundColor: isActive ? color : '#36454F', // Use isActive instead of active
                                    borderRadius: '50%',
                                    marginBottom: '20px',
                                }}
                            ></div>
                            <div
                                style={{
                                    width: '65px',
                                    height: '65px',
                                    backgroundColor: isActive ? color : '#36454F', // Use isActive instead of active
                                    borderRadius: '50%',
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                <div style={{
                    ...styles.displayContainer,
                    marginTop: reactionTime !== null ? -10 : 55,
                    }}
                >
                    {reactionTime !== null && (
                        <p style={{ marginTop: 30 }}>
                            <span style={styles.reactionTimeText}>
                                {typeof reactionTime === 'string'
                                    ? reactionTime
                                    : `${reactionTime}`}
                            </span>
                            <span style={{ fontSize: 22 }}> ms</span>
                        </p>
                    )}

                    <p style={{fontSize: 22, fontWeight: '600'}}>
                        {isActive ? 'Click when the lights go out' : 'Click now'}
                    </p>

                </div>
            </div>
        </div>
    );
};