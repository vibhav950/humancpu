import React, { useState } from 'react';

const ReactionTimeTest = () => {
    const [lights, setLights] = useState(['gray', 'gray', 'gray', 'gray', 'gray']);
    const [isActive, setIsActive] = useState(false);
    var [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startTest = async () => {
        setLights(['gray', 'gray', 'gray', 'gray', 'gray']);
        setIsActive(true);
        setStartTime(null);
        setReactionTime(null);

        // Turn on lights sequentially
        for (let i = 0; i < 5; i++) {
            await sleep(1000);
            setLights((prevLights) => {
                const newLights = [...prevLights];
                newLights[i] = 'red';
                return newLights;
            });
        }

        // Turn off lights after a random delay
        setTimeout(() => {
            setLights(['gray', 'gray', 'gray', 'gray', 'gray']);
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
    return (
        <div style={{ textAlign: 'center' }} onClick={handleClick}>
            <h1>Reaction Time Test</h1>
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
                                backgroundColor: isActive ? color : 'gray', // Use isActive instead of active
                                borderRadius: '50%',
                                marginBottom: '20px',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '65px',
                                height: '65px',
                                backgroundColor: isActive ? color : 'gray', // Use isActive instead of active
                                borderRadius: '50%',
                            }}
                        ></div>
                    </div>
                ))}
            </div>
            {reactionTime !== null && <p>Reaction Time: {reactionTime} milliseconds</p>}
            <p>{isActive ? 'Click when the lights go off!' : 'Click now'}</p>
        </div>
    );
};

export default ReactionTimeTest;
