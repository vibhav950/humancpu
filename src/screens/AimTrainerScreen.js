// Canvas.js
import React, {useState, useEffect, useRef, useCallback} from "react";
import '../styles/aimTrainerScreen.css'

export default function AimTrainerScreen() {
    const canvasRef = useRef(null);

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

    return (
        <div>
            <h1>Human CPU</h1>
            <h2>Aim Trainer</h2>
            {!isGameStarted && timeLeft > 0 && (
                <div>
                    <button onClick={startGame}>Start Game</button>
                </div>
            )}
            {isGameStarted && (
                <div>
                    <div style={{display: "flex"}}>
                        <p style={{marginRight: "500px"}}>Score: {score} </p>
                        <p>Time Left: {timeLeft}</p>
                    </div>

                    <div
                        onClick={handleClick}
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            height: "60vh",
                            width: "80vh"
                        }}
                        ref={(ref) => (canvasRef.current = ref)}
                    >
                        <div className="bullseye" style={{
                            width: '75px',
                            height: '75px',
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
            {!isGameStarted && timeLeft === 0 && (
                <div>
                    <p>Game Over!</p>
                    <button onClick={restartGame}>Restart Game</button>
                </div>
            )}
        </div>
    );
};