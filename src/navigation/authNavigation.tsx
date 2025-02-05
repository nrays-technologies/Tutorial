import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ForgotPassword from '../screens/auth/forgotPassword';
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import { StackAuth } from '../typeScript/navType';

const Stack = createNativeStackNavigator<StackAuth>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTitleAlign: 'center',
        // headerLeft: () => <ButtonBackNav />,
        headerStyle: {
          backgroundColor: '#FFF',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 32
        },
        headerTintColor: 'green',
        headerShown: true
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}/>
    </Stack.Navigator>
  )
}

export default AuthNavigation;