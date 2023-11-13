import logo from './logo.svg';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import TypingSpeedScreen from './screens/TypingSpeedScreen';

function App() {
  return (
    <div className="App">
      <TypingSpeedScreen></TypingSpeedScreen>
      {/* <HomeScreen></HomeScreen> */}
    </div>
  );
}

export default App;
