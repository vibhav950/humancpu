import LoginForm from "../components/Login";
import SignUpForm from "../components/Signup";
import React, { useState } from 'react';
import '../styles/loginScreen.css'

export default function LoginScreen() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <h2>Human CPU</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <LoginForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello, Friend!</h1>
              <p>
                Enter your personal details and start journey with us
                <br />
                <br />
                Already have account ?
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
                <br />
                <br />
                Don't have an account ?
              </p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
