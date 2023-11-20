import React, {Component, useState} from "react";
import { generate } from "random-words";
import "../styles/typingSpeedScreen.css";
import {useLocation, useNavigate} from 'react-router-dom';
import {colors} from "../styles/colors";
import {users} from "../data/userData";

const N_WORDS = 15;
var name;
const styles = {
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
};

export default function TypingSpeedScreenWrapper (){
  const [logoutHover, setLogoutHover] = useState(false);
  const {state} = useLocation();
  if(state){
    name = state.name;
    if(name===undefined){
      name="Anonymous";
    }}else{
    name="Anonymous";
  }
  const navigate = useNavigate(); // extract navigation prop here 

  function toLeaderboard(){
    navigate('/Leaderboard', {state: state} );
  }
  function toHome(){
    navigate('/Home', {state: state} );
  }
   return <div><div id="profileContainer" style={styles.profileContainer} onClick={() => {navigate('/Leaderboard', {state: state});}}>
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
   </div><TypingSpeedScreen navigation={toHome} leader={toLeaderboard}/></div> //pass to your component.
};


// const handleHomeButtonClick = () => {
//   navigate('/'); // Navigate to the home screen when headerIcon is clicked
// };

class TypingSpeedScreen extends Component {
  state = {
    text: "",
    inputValue: "",
    lastLetter: "",
    words: [],
    completedWords: [],
    completed: false,
    startTime: undefined,
    timeElapsed: 0,
    wpm: 0,
    started: false,
    progress: 0,
  };
  async submitresult (score){
    var test="TypingSpeed";
    const response = await fetch('http://localhost:5000/TypingSpeed', {
      method: "post",
      body: JSON.stringify({ name, score, test}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert("Score submitted successfully");
    const Home = this.props.navigation;
    Home();
  }
  componentDidMount() {
    /* update the timer every second */
    this.timerInterval = setInterval(this.calculateWPM, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  };

  setText = () => {
    let words = new Array(N_WORDS).fill(null).map(() => generate());
    let text = words.join(' ')

    this.setState({
      text: text,
      words: words,
      completedWords: []
    });
  };

  startGame = () => {
    this.setText();
    
    this.setState({
      inputValue:  "",
      started: true,
      startTime: Date.now(),
      completed: false,
      progress: 0
    });
  };

  handleChange = e => {
    const { words, completedWords } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];

    const currentWord = words[0];

    /* if SPACE or '.', check the word */
    if (lastLetter === " " || lastLetter === ".") {
      /* check to see if it matches currentWord */
      /* trim to remove space */
      if (inputValue.trim() === currentWord) {
        /* remove the word from wordsArray and clear the input field */
        const newWords = [...words.slice(1)];
        const newCompletedWords = [...completedWords, currentWord];

        /* calc progress based on the number of remaining words */
        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;
        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          inputValue: "",
          completed: newWords.length === 0,
          progress: progress
        });
      }
    } else {
      this.setState({
        inputValue: inputValue,
        lastLetter: lastLetter
      });
    }

    this.calculateWPM();
  };


  calculateWPM = () => {
    const { startTime, completedWords } = this.state;
    if (!startTime) return;

    const now = Date.now();
    const diff = (now - startTime) / 1000 / 60; /* 1000 (ms) / 60 (s) */

    const wordsTyped = Math.ceil(
      completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
    );

    const wpm = Math.ceil(wordsTyped / diff);

    this.setState({
      wpm: wpm,
      timeElapsed: diff
    });
  }; 

  render() {
    const {
      text,
      inputValue,
      completedWords,
      wpm,
      timeElapsed,
      started,
      completed,
      progress
    } = this.state;

    const toHome = this.props.navigation;
    const toLeaderboard = this.props.leader;

    if (!started)
      return (
        <div className="container-1">
          {/* <a href="/" style={{ textDecoration: 'none' }}> */}
            <div id="homeIcon" style={styles.headerContainer} onClick={() => {toHome();}}>
              <img
              src={require('../assets/icons/logo.png')}
              style={{height: 78, width: 'auto'}}
              />
            </div>
          {/* </a> */}
          <img
          src={require('../assets/icons/speed.png')}
          style={{width: 100, height: 100, marginTop: -25}}
          />
          <h3 style={{ marginTop: 10 }}>Typing speed</h3>
          <p>
            Type all the words on your screen as fast as you<br/>
            can while making the fewest mistakes possible
          </p>

          <div
           style={{
                   alignContent: 'center',
                   display: 'flex',
                   justifyContent: 'space-between',
                   paddingLeft: 125,
                   paddingRight: 125
           }}>

            <button className="start-btn" onClick={this.startGame}>
              <img
              style={{width: 28, height: 28, marginRight: 10}}
              src={require('../assets/icons/start-grey.png')}
              />
              Start
            </button>

            {/* <a href="/" style={{textDecoration: 'none'}}> */}
              <button className="start-btn" onClick={() => {toHome();}}>
                <img
                style={{width: 25, height: 25, marginRight: 10}}
                src={require('../assets/icons/home-grey.png')}
                />
                Home
              </button>
            {/* </a> */}

          </div>

        </div>
      );

    if (!text) return <p>Loading...</p>;

    if (completed) {
      this.componentWillUnmount();
      return (
        <div className="container-1">
          <h2>
            Your typing speed is <strong>{wpm} WPM</strong>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="end-btn" onClick={this.startGame}>
              <img
                style={{width: 25, height: 25, marginRight: 0}}
                src={require('../assets/icons/replay.png')}
                />
              Retry
            </button>

              <button className="end-btn" onClick={()=>{this.submitresult(wpm);}}>
                <img
                    style={{width: 25, height: 25, marginRight: 0}}
                />
                Submit
              </button>

            {/* <a href="/" style={{textDecoration: 'none'}}> */}
              <button className="end-btn" onClick={() => {toHome();}}>
                <img
                style={{width: 25, height: 25, marginRight: 0}}
                src={require('../assets/icons/home-grey.png')}
                />
                Home
              </button>
            {/* </a> */}
          </div>
        </div>
      );
    }

    return (
      <div>
        
        <div className="container-2">
          <div className="wpm-disp">
            <div>
            <span className="hdr-txt">WPM</span>
            {wpm}
            </div>
            <div>
            <span className="hdr-txt">Time</span>
            {Math.floor(timeElapsed * 60)}s
            </div>
          </div>

          <progress className="wpm-prog" value={progress} max="100"/>
          <p className="text">
            {text.split(" ").map((word, w_idx) => {
              let highlight = false;
              let currentWord = false;

              // this means that the word is completed, so turn it green
              if (completedWords.length > w_idx) {
                highlight = true;
              }

              if (completedWords.length === w_idx) {
                currentWord = true;
              }

              return (
                <span
                  className={`word 
                  ${highlight && "cor"} 
                  ${currentWord && "cur-highlight"}`}
                  key={w_idx}
                >
                  {word.split("").map((letter, l_idx) => {
                    const isCurrentWord = w_idx === completedWords.length;
                    const isWronglyTyped = letter !== inputValue[l_idx];
                    const shouldBeHighlighted = l_idx < inputValue.length;

                    return (
                      <span
                        className={`letter ${
                          isCurrentWord && shouldBeHighlighted
                            ? isWronglyTyped
                              ? "inc"
                              : "cor"
                            : ""
                        }`}
                        key={l_idx}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </p>
          <div style={{marginTop: 10, position: 'relative'}}>
            <input
              type="text"
              onChange={this.handleChange}
              value={inputValue}
              autoFocus={started ? true : false}
              style={{marginTop: 0}}
            />
            <div
            style={{
                    alignContent: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: 125,
                    paddingRight: 125
            }}>
              <button className="container-2-btn" onClick={this.startGame}>
                <img
                style={{width: 28, height: 28, marginRight: 10}}
                src={require('../assets/icons/replay.png')}
                />
                Restart
              </button>

            {/* <a href="/" style={{textDecoration: 'none'}}> */}
              <button className="container-2-btn" onClick={() => {toHome();}}>
                <img
                style={{width: 25, height: 25, marginRight: 10}}
                src={require('../assets/icons/home-grey.png')}
                />
                Home
              </button>
            {/* </a> */}
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}