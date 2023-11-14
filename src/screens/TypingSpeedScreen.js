import React, { Component } from "react";
import { generate } from "random-words";
import "../styles/typingSpeedScreen.css";

const N_WORDS = 40;

export default class TypingSpeedScreen extends Component {
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

  componentDidMount() {
    // this.startGame();
    this.timerInterval = setInterval(this.calculateWPM, 1000); // Update every second
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
    console.log(currentWord, "currentWord");

    // if space or '.', check the word
    if (lastLetter === " " || lastLetter === ".") {
      // check to see if it matches to the currentWord
      // trim because it has the space
      if (inputValue.trim() === currentWord) {
        // remove the word from the wordsArray
        // cleanUp the input
        const newWords = [...words.slice(1)];
        const newCompletedWords = [...completedWords, currentWord];

        // Get the total progress by checking how much words are left
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
    const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s

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

    if (!started)
      return (
        <div className="container-1">
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

            <button className="start-btn" onClick={() => {}}>
              <img
              style={{width: 25, height: 25, marginRight: 10}}
              src={require('../assets/icons/home-grey.png')}
              />
              Home
            </button>
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
          <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <button className="end-btn" onClick={this.startGame}>
              Play again
            </button>
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

          <progress class="wpm-prog" value={progress} max="100"/>
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
                src={require('../assets/icons/start-grey.png')}
                />
                Restart
              </button>

              <button className="container-2-btn" onClick={() => {}}>
                <img
                style={{width: 25, height: 25, marginRight: 10}}
                src={require('../assets/icons/home-grey.png')}
                />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}