// Canvas.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import '../styles/aimTrainerScreen.css'

export default function AimTrainerScreen() {
  const canvasRef = useRef(null);

  // Function to generate a random target position
  const generateRandomTarget = useCallback(() => {
    if (canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      return {
        left: Math.random() * (canvasRect.width - 50),
        top: Math.random() * (canvasRect.height - 50)
      };
    }
    return { left: 0, top: 0 };
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
      clickX <= target.left + 50 &&
      clickY >= target.top &&
      clickY <= target.top + 50;

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
          <p>Score: {score}</p>
          <p>Time Left: {timeLeft} seconds</p>
          <div
            style={{
              position: "absolute",
              left: target.left,
              top: target.top,
              width: "50px",
              height: "50px",
              backgroundColor: "red",
              borderRadius: "50%"
            }}
          />
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