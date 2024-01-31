import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom";
import {colors} from "../styles/colors";
import {users} from "../data/userData";

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

const Leaderboard = () => {
    const [logoutHover, setLogoutHover] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();
    const handleHomeButtonClick = () => {
        navigate('/Home', {state: state} ); // Navigate to the home screen when headerIcon is clicked
    };

    console.log(state);
    if(state){
        var {name} = state;
        if(name===undefined){
            name="Anonymous";
        }}else{
        name="Anonymous";
    }

    const [selectedTestType, setSelectedTestType] = useState(null);
    const [dummyScores, setDummyScores] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        axios.get('http://localhost:5000/data')
            .then(response => {
                // Update the state with the fetched data
                setDummyScores(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []); // The empty dependency array ensures the effect runs once after the initial render

    // Sort and organize the data
    const sortedArrays = {};
    for (const score of dummyScores) {
        const testType = score.test;

        if (!sortedArrays[testType]) {
            sortedArrays[testType] = [];
        }

        sortedArrays[testType].push(score);
    }

    // Optionally, you can sort each array by score
    for (const testType in sortedArrays) {
        if (testType === 'ReactionTime') {
            // For ReactionTime test, reverse the sorting order
            sortedArrays[testType].sort((a, b) => a.score - b.score);
        } else {
            sortedArrays[testType].sort((a, b) => b.score - a.score);
        }
    }

    // Define a function to get the label for each test type
    const getScoreLabel = (testType) => {
        switch (testType) {
            case 'ClickSpeed':
                return 'cps';
            case 'AimTrainer':
                return 'targets clicked';
            case 'ReactionTime':
                return 'ms';
            case 'TypingSpeed':
                return 'wpm';
            default:
                return 'points';
        }
    };

    return (
        <div>
        <div id="header" style={styles.headerContainer} onClick={handleHomeButtonClick}>
            <img
                src={require('../assets/icons/logo.png')}
                style={styles.mainLogo}
                alt="Logo"
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
        <div style={{ backgroundColor: '#3a3b3c', padding: '20px', borderRadius: '15px', maxWidth: '700px', margin: 'auto' }}>
            <h1 style={{ color: '#00AEEF', fontSize: '48px', marginBottom: '20px' }}>Leaderboard</h1>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#00AEEF', fontSize: '24px' }}>Select Test Type:</label>
                <select
                    value={selectedTestType || ''}
                    onChange={(e) => setSelectedTestType(e.target.value === 'select' ? null : e.target.value)}
                    style={{ backgroundColor: '#3a3b3c', color: '#00AEEF', fontSize: '24px', padding: '10px', borderRadius: '5px', width: '50%' }}
                >
                    <option value="select">Select your choice</option>
                    {Object.keys(sortedArrays).map((testType) => (
                        <option key={testType} value={testType}>
                            {testType}
                        </option>
                    ))}
                </select>
            </div>
            {selectedTestType && (
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0', fontSize: '24px', color: '#00AEEF' }}>
                    {sortedArrays[selectedTestType].slice(0, 5).map((score) => (
                        <li key={score.id} style={{ marginBottom: '10px' }}>
                             {score.name}: {score.score} {getScoreLabel(score.test)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
            </div>
    );
};

export default Leaderboard;
