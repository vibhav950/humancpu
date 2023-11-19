import './App.css';
import HomeScreen from './screens/HomeScreen';
import TypingSpeedScreen from './screens/TypingSpeedScreen';

function App() {
  let Component = null;

  switch (window.location.pathname) {
    case '/':
      Component = HomeScreen;
      break;
    case '/AimTraier':
      Component = TypingSpeedScreen;
      break;
    case '/ClickSpeed':
      Component = TypingSpeedScreen;
      break;
    case '/ReactionTime':
      Component = TypingSpeedScreen;
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
