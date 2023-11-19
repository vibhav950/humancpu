import LSPage from "./Components/Login_Signup/LoginPage";
import HomeScreen from "./Components/HomePage/HomePage"
import TypingSpeedScreen from "./Components/TypingSpeed/TypingSpeedScreen";
import ClickSpeed from "./Components/ClickSpeed/ClickSpeed";
import Canvas from "./Components/AimTraining/Canvas";

function App() {
  let Component;

  switch (window.location.pathname) {
    case '/':
      Component = HomeScreen;
      break;
    case '/AimTraier':
      Component = Canvas;
      break;
    case '/ClickSpeed':
      Component = ClickSpeed;
      break;
    case '/TypingSpeed':
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