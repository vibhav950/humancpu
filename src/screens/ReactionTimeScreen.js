import React, { useState } from 'react';

export default function ReactionTimeScreen() {
    const [lights, setLights] = useState(['#36454F', '#36454F', '#36454F', '#36454F', '#36454F']);
    const [isActive, setIsActive] = useState(false);
    var [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);
    const [hover, setHover] = useState(false);

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

    const handleClick = () => {
        if (!isActive) {
            if (startTime !== null) {
                const endTime = Date.now();
                const currentReactionTime = endTime - startTime;
                setReactionTime(currentReactionTime);
                setStartTime(null);
                return;
            }
            startTest();
        }
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
        }
    }

    return (
        <div style={{...
            styles.parentContainer,
            backgroundColor : hover ? '#4C5667' : '#3A424F', 
            }}
            onClick={handleClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            <a href="/" style={{ textDecoration: 'none' }}>
                <div id="header" style={styles.headerContainer}>
                <img
                src={require('../assets/icons/logo.png')}
                style={{...styles.mainLogo, height: 78, width: 'auto'}}
                />
                </div>
            </a>

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
                                ? reactionTime // Display "Jump Start!!!" differently
                                : `${reactionTime}`}
                        </span>
                        <span style={{ fontSize: 22 }}> ms</span>
                    </p>
                )}

                <p>
                    {isActive ? 'Click when the lights go out' : 'Click to start'}
                </p>

            </div>
        </div>
    );
};