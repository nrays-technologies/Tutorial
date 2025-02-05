
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/welcome';

const Stack = createNativeStackNavigator();

const App = () => {

  return <NavigationContainer>
    <Welcome />
  </NavigationContainer>
}

export default App;