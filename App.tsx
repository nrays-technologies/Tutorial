
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/welcome';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/redux/store';
const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <ReduxProvider store={store}>
      <Welcome />
    </ReduxProvider>
  </NavigationContainer>
};

export default App;