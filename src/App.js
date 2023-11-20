import './App.css';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AimTrainerScreen from './screens/AimTrainerScreen';
import ClickSpeedScreen from './screens/ClickSpeedScreen';
import ReactionTimeScreen from './screens/ReactionTimeScreen';
import TypingSpeedScreen from './screens/TypingSpeedScreen';

function App() {
  let Component = null;

  switch (window.location.pathname) {
    case '/':
      Component = HomeScreen;
      break;
    case '/AimTrainer':
      Component = AimTrainerScreen;
      break;
    case '/ClickSpeed':
      Component = ClickSpeedScreen;
      break;
    case '/ReactionTime':
      Component = ReactionTimeScreen;
      break;
    case '/TypingSpeed':
      Component = TypingSpeedScreen;
      break;
  }
  return (
    <div className="App">
      <Component/>
    </div>
  );
}

export default App;
