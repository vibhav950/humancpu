import * as React from 'react'
import './App.css'
import * as ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AimTrainerScreen from './screens/AimTrainerScreen';
import ClickSpeedScreen from './screens/ClickSpeedScreen';
import ReactionTimeScreen from './screens/ReactionTimeScreen';
import TypingSpeedScreen from './screens/TypingSpeedScreen';

const router = createBrowserRouter([
  {
    path: '/Home',
    element:<HomeScreen/>,
  },
  {
    path: '/AimTraier',
    element: <AimTrainerScreen/>,
  },
  {
    path: '/ClickSpeed',
    element: <ClickSpeedScreen/>,
  },
  {
    path: '/ReactionTime',
    element: <ReactionTimeScreen/>,
  },
  {
    path: '/TypingScreen',
    element: <TypingSpeedScreen/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);