// Canvas.js
import React, { useState, useEffect, useRef, useCallback } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const generateRandomTarget = useCallback(() => {
        if (canvasRef.current) {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            return {
                left: Math.random() * (canvasRect.width - 50),
                top: Math.random() * (canvasRect.height - 50),
            };
        }
        return { left: 0, top: 0 };
    }, []);
    const [target, setTarget] = useState(generateRandomTarget());
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds




    useEffect(() => {
        setTarget(generateRandomTarget());
    }, [generateRandomTarget]); // Run when generateRandomTarget changes

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

        if (isClickInside) {
            setScore((prevScore) => prevScore + 1);
            setTarget(generateRandomTarget());
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTarget(generateRandomTarget());
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 60000);

        return () => clearTimeout(timer);
    }, [generateRandomTarget]); // Run when generateRandomTarget changes

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    return (
        <div
            onClick={handleClick}
            style={{ position: 'relative', overflow: 'hidden', height: '60vh', width: '80vh'}}
            ref={(ref) => (canvasRef.current = ref)}
        >
            <p>Score: {score}</p>
            <p>Time Left: {timeLeft} seconds</p>
            <div
                style={{
                    position: 'absolute',
                    left: target.left,
                    top: target.top,
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                }}
            />
        </div>
    );
};

export default Canvas;
