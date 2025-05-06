// App.js - Component Registration
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { AuthContextProvider } from './context/authContext';

// Import the screens that need registration
import SignIn from './app/(auth)/signin';
import SignUp from './app/(auth)/signUp';
import Home from './app/(app)/home';

// Register the auth component
AppRegistry.registerComponent('auth', () => AuthContextProvider);

// This file ensures all components are registered properly
export default function App() {
  return null; // This component doesn't need to render anything
}

registerRootComponent(App);