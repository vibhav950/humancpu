import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AimTrainerScreen from './screens/AimTrainerScreen';
import ClickSpeedScreen from './screens/ClickSpeedScreen';
import ReactionTimeScreen from './screens/ReactionTimeScreen';
import TypingSpeedScreen from './screens/TypingSpeedScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/Home" element={<HomeScreen />} />
        <Route path="/AimTrainer" element={<AimTrainerScreen />} />
        <Route path="/ClickSpeed" element={<ClickSpeedScreen />} />
        <Route path="/ReactionTime" element={<ReactionTimeScreen />} />
        <Route path="/TypingSpeed" element={<TypingSpeedScreen />} />
      </Routes>
    </Router>
  );
}

export default App;


// function App() {
//   let Component = null;

//   switch (window.location.pathname) {
//     case '/':
//         Component = LoginScreen;
//         break;
//     case '/HomeScreen':
//       Component = HomeScreen;
//       break;
//     case '/AimTrainer':
//       Component = AimTrainerScreen;
//       break;
//     case '/ClickSpeed':
//       Component = ClickSpeedScreen;
//       break;
//     case '/ReactionTime':
//       Component = ReactionTimeScreen;
//       break;
//     case '/TypingSpeed':
//       Component = TypingSpeedScreen;
//       break;
//   }
//   return (
//     <div className="App">
//       <Component/>
//     </div>
//   );
// }

// export default App;
