// import LSPage from "./Components/Login_Signup/LoginPage";
import HomeScreen from "./Components/HomePage/HomePage"
import TypingSpeedScreen from "./Components/TypingSpeed/TypingSpeedScreen";
import ClickSpeed from "./Components/ClickSpeed/ClickSpeed";
import Canvas from "./Components/AimTraining/Canvas";
import ReactionTimeTest from "./Components/ReactionTime/ReactionTimeTest";

function App() {
  let Component;

  switch (window.location.pathname) {
    case '/':
      Component = HomeScreen;
      break;
    case '/AimTrainer':
      Component = Canvas;
      break;
    case '/ReactionTime':
      Component = ReactionTimeTest;
      break;
    case '/ClickSpeed':
      Component = ClickSpeed;
      break;
    case '/TypingSpeedScreen':
      Component = TypingSpeedScreen;
      break;
    default :
      break;
  }
  return (
    <div className="App">
      {/* <TypingSpeedScreen></TypingSpeedScreen> */}
      {/* <HomeScreen></HomeScreen> */}
      <Component/>
    </div>
  );
}

export default App;