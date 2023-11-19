// ClickCounter.js
import React, { useState, useEffect } from 'react';
import './ClickSpeed.css';

const ClickSpeedCounter = ({ clicks, time }) => {
  const clickSpeed = clicks / time || 0;

  return (
    <div className="click-speed-container">
      <p className="click-speed">Click Speed: {clickSpeed.toFixed(2)} clicks per second</p>
    </div>
  );
};

const ClickSpeed = () => {
  const [clickCount, setClickCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(10);

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

  const handleTimeChange = (event) => {
    setSelectedTime(parseInt(event.target.value, 10));
    // Optionally, you can reset the game when the user changes the time
    setClickCount(0);
    setTimeRemaining(parseInt(event.target.value, 10));
    setIsGameActive(false);
  };

  return (
    <div className="click-counter-container">
      <h1 className="website-name">Human CPU</h1>
      <h2 className="click-counter-title">ClickSpeed</h2>
      <label className="time-label">
        Select Time : 
        <select className="time-dropdown" value={selectedTime} onChange={handleTimeChange}>
          <option value={5}>5s</option>
          <option value={10}>10s</option>
          <option value={15}>15s</option>
          <option value={30}>30s</option>
        </select>
      </label>
      <div className="click-stats">
        <p className="time-remaining">Time Remaining : {timeRemaining} seconds</p>
        <p className="click-count">Clicks : {clickCount}</p>
        <ClickSpeedCounter clicks={clickCount} time={selectedTime - timeRemaining} />
      </div>
      {isGameActive ? (
        <div className="click-area" onClick={handleAreaClick}>
          {/* Empty div for click area */}
          <p className="click-here-text">Click here!</p>
        </div>
      ) : (
        <div className="button-container">
          {clickCount > 0 ? (
            <div>
              <p className="game-over">Game Over!</p>
              <button className="restart-button" onClick={handleRestartClick}>Restart</button>
            </div>
          ) : (
            <button className="start-button" onClick={handleStartClick}>Start</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClickSpeed;
