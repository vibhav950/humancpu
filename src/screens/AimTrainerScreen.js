// Canvas.js
import React, {useState, useEffect, useRef, useCallback} from "react";
import '../styles/aimTrainerScreen.css';
import { useNavigate } from 'react-router-dom';

export default function AimTrainerScreen() {
    const canvasRef = useRef(null);
    const navigate = useNavigate(); // Initialize useHistory hook

    // Function to generate a random target position
    const generateRandomTarget = useCallback(() => {
        if (canvasRef.current) {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            return {
                left: Math.random() * (canvasRect.width - 75),
                top: Math.random() * (canvasRect.height - 75)
            };
        }
        return {left: 0, top: 0};
    }, []);

    const [target, setTarget] = useState(generateRandomTarget());
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds
    const [isGameStarted, setIsGameStarted] = useState(false);

    // Function to start the game
    const startGame = () => {
        setIsGameStarted(true);
    };

    // Function to restart the game
    const restartGame = () => {
        setIsGameStarted(true);
        setScore(0);
        setTimeLeft(60);
    };

    useEffect(() => {
        // Additional game initialization logic can be added here
        // This useEffect runs when isGameStarted changes
        if (isGameStarted) {
            // For example, you can reset score, time, etc.
            setScore(0);
            setTimeLeft(60);
        }
    }, [isGameStarted]);

    useEffect(() => {
        // Update the target when generateRandomTarget changes
        setTarget(generateRandomTarget());
    }, [generateRandomTarget]);

    const handleClick = (event) => {
        if (!canvasRef.current) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const clickX = event.clientX - canvasRect.left;
        const clickY = event.clientY - canvasRect.top;

        const isClickInside =
            clickX >= target.left &&
            clickX <= target.left + 75 &&
            clickY >= target.top &&
            clickY <= target.top + 75;

        if (isGameStarted && isClickInside) {
            setScore((prevScore) => prevScore + 1);
            setTarget(generateRandomTarget());
        }
    };

    useEffect(() => {
        // Set a timer to update the target and decrease timeLeft every 60 seconds
        const timer = setTimeout(() => {
            if (isGameStarted) {
                setTarget(generateRandomTarget());
                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }
        }, 60000);

        return () => clearTimeout(timer);
    }, [generateRandomTarget, isGameStarted]);

    useEffect(() => {
        // Set a countdown interval to decrease timeLeft every second
        const countdown = setInterval(() => {
            if (isGameStarted) {
                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }
        }, 1000);

        // Stop the game when timeLeft becomes 0
        if (timeLeft === 0) {
            setIsGameStarted(false);
        }

        return () => clearInterval(countdown);
    }, [isGameStarted, timeLeft]);

    const styles = {
      headerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 15,
      },
    }

    const handleHomeButtonClick = () => {
        navigate('/Home') // Navigate to the home screen when headerIcon is clicked
      }

    return (
        <div>
            {/* <a href="/" style={{ textDecoration: 'none' }}> */}
              <div id="homeIcon" style={styles.headerContainer} onClick={handleHomeButtonClick}>
              <img
              src={require('../assets/icons/logo.png')}
              style={{height: 78, width: 'auto'}}
              />
              </div>
            {/* </a> */}

            <div
            className="parent-container">

            {/* <img
            src={require('../assets/icons/target.png')}
            style={{width: 100, height: 100, marginTop: 20, marginBottom: 25}}
            /> */}

            { !isGameStarted && timeLeft > 0 && (
              <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>

                <img
                src={require('../assets/icons/target.png')}
                style={{width: 100, height: 100, marginTop: 20, marginBottom: 25}}
                />

                <p className="aimtr-subtext">
                  Click the bullseye as many times as possible till
                  the timer runs out
                </p>
              </div>
            )}

            {!isGameStarted && timeLeft > 0 && (
                <div>
                  <div>
                      <button className="aimtr" onClick={startGame}>
                        <img
                        style={{width: 28, height: 28, marginRight: 10}}
                        src={require('../assets/icons/start-grey.png')}
                        />
                        Start
                      </button>
                  </div>
                </div>
            )}
            {isGameStarted && (
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', marginTop: 50}}>
                        <p style={{color: '#FF7B91', marginRight: "500px"}}><span className="score">Score </span>{score} </p>
                        <p style={{color: '#FF7B91'}}><span className="time-left">Time Left </span>{timeLeft} s</p>
                    </div>

                    <div
                        onClick={handleClick}
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            height: 375,
                            width: 800,
                            boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.7)',
                            borderRadius: 15,
                            backgroundColor: '#3A424F',
                        }}
                        ref={(ref) => (canvasRef.current = ref)}
                    >
                        <div className="bullseye" style={{
                            width: '55px',
                            height: '55px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: target.top,
                            left: target.left
                        }}>
                            <div className="circle" style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'red',
                                borderRadius: '50%',
                            }}>
                                <div className="inner-circle" style={{
                                    width: '80%',
                                    height: '80%',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '10%',
                                    left: '10%',
                                }}>
                                    <div className="center-circle" style={{
                                        width: '60%',
                                        height: '60%',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '20%',
                                        left: '20%',
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            {!isGameStarted && timeLeft === 0 && (
                <div>
                    <p style={{color: '#FF7B91', fontSize: 22, fontWeight: '600', marginBottom: 50}}>Game Over</p>
                    <button className="aimtr" onClick={restartGame}>Restart</button>
                </div>
            )}
        </div>
    );
};