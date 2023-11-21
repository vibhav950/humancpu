import React, { useState } from 'react';
import '../styles/loginScreen.css';
import {useNavigate} from 'react-router-dom';
export default function LoginScreen() {
    const [name, setName] = useState("");
    const [password, setpassword] = useState("");
    const [loginMode, setLoginMode] = useState(true);
    const navigate = useNavigate();

    const styles = {
        headerContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            margin: 15,
        },
        mainLogo: {
            height: 78,
            widhth: 'auto',
        },
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/', {
                method: "post",
                body: JSON.stringify({ name, password, loginMode }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "HTTP error!");
            }

            console.warn(result);

            if (result.success) {
                alert(loginMode ? "Login successful" : "User registered successfully");
                navigate('/Home', { state: { name } });
                // eslint-disable-next-line react-hooks/rules-of-hooks
            } else {
                alert(result.message); // Display the message from the server
            }
        } catch (error) {
            alert(loginMode ? "Wrong username or password" : "User already exists!" );
            setpassword("");
            setName("");
            console.error('Error:', error);
            // Handle error gracefully (e.g., show an error message to the user)
        }
    };

    return (
        <div>

            <div id="header" style={styles.headerContainer}>
                <img
                    src={require('../assets/icons/logo.png')}
                    style={styles.mainLogo}
                />
            </div>
            <form>
                <div style={{ fontSize: "25px", padding: "2%", paddingLeft: "4%", paddingTop: "4%", color: "#00AEEF" }}>{loginMode ? "Login" : "Signup"}:</div>
                <div style={{ margin: "3%", marginTop: "0", padding: "2%" }}>
                    <input type="text" style={{ fontSize: "25px", padding: "2%", width: "100%" }} name="username" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username"></input>
                </div>
                <div style={{ fontSize: "25px", padding: "2%", paddingLeft: "4%", color: "#00AEEF"}}>Password:</div>
                <div style={{ margin: "3%", marginTop: "0", padding: "2%" }}>
                    <input type="password" style={{ fontSize: "25px", padding: "2%", width: "100%" }} name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password"></input>
                </div>
                <input type="hidden" name="login_flag" value={loginMode ? 1 : 0} />
                <div style={{ marginLeft: "40%", marginRight: "40%", marginBottom: "8%", marginTop: "0%", padding: "2%", textAlign: "center" }}>
                    <button type="submit" style={{ fontSize: "25px", backgroundColor: "#00AEEF" }} onClick={handleOnSubmit}>
                        {loginMode ? "Login" : "Signup"}
                    </button>
                </div>
                <div style={{ textAlign: "center" }}>
        <span onClick={() => setLoginMode(!loginMode)} style={{ cursor: "pointer", color: "#00AEEF", textDecoration: "underline" }}>
          {loginMode ? "Switch to Signup" : "Switch to Login"}
        </span><br/><br/><br/>
                    <button type="submit" style={{ fontSize: "25px", backgroundColor: "#00AEEF" }} onClick={()=>{navigate('/Home')}}>
                        Login as Anonymous
                    </button>
                </div>
            </form>
        </div>
    );
}