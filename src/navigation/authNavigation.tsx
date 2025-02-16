import React from 'react';
// import 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ButtonBackNav, HeaderTitleNav } from '../screen/components';
import { ColorsApp } from '../utilities/colors';
import EnterPhone from '../screen/auth/enterPhone';
import EnterOTP from '../screen/auth/enterOtp';
import ForgotPinPhone from '../screen/auth/forgotPinPhone';
import LoginWithPin from '../screen/auth/loginWithPin';
import Pin from '../screen/auth/pin screen/pin';
import PinSetup from '../screen/auth/PinSetup';
import Authorization from '../screen/auth/authorization';

export type AuthStackRoots = {
  Authorization: undefined
  LoginWithPin: undefined;
  LoginWithCredential: undefined;
  EnterPhone: {isForgotPin: boolean};
  EnterOTP: {mobile: string};
  EnterName: undefined
  EnterUserName:undefined
  PinSetup: undefined
  ForgotPinPhone: undefined,
};

const Stack = createStackNavigator<AuthStackRoots>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Authorization"
      screenOptions={{
        gestureEnabled: false,
        headerTitleAlign: "center",
        headerLeft: () => <ButtonBackNav />,
        // headerTitle: () => <HeaderTitleNav />,
        headerStyle: {
          // backgroundColor: ColorsApp.white,
          backgroundColor: ColorsApp.bgScreen,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#000',
      }}>
      <Stack.Screen
        name="Authorization"
        component={Authorization}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="LoginWithPin"
        component={LoginWithPin}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="EnterPhone"
        component={EnterPhone}
        options={{
          title: 'Signup',
          presentation: 'transparentModal',
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ForgotPinPhone"
        component={ForgotPinPhone}
        options={{
          title: '',
          presentation: 'transparentModal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      
      <Stack.Screen
        name="EnterOTP"
        component={EnterOTP}
        options={{
          title: 'Enter OTP',
          presentation: 'transparentModal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="PinSetup"
        component={PinSetup}
        options={{
          title: 'Set Up Pin Code',
          headerShown: true,
          presentation: 'transparentModal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthNavigation;
