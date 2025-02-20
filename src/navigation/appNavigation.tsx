import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/app/home';
import Profile from '../screens/app/profile';
import Icons from '../utilities/icons';
import Settings from '../screens/app/settings';
import ColorsApp from '../utilities/colors';


// const Stack = createNativeStackNavigator();
const StackTab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <StackTab.Navigator screenOptions={{
      tabBarInactiveTintColor: ColorsApp.grey,
      tabBarActiveTintColor: ColorsApp.activeTab,
      tabBarStyle: {
        height: 60,
      }
    }}>
      <StackTab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ focused, color, size }) =>  <Icons.Feather name='home' size={focused ? 22 : 18} color={color} />
        
      }} />
      <StackTab.Screen name="Profile" component={Profile} 
      options={{

        tabBarIcon: ({ focused, color, size }) => {
          
          return <Icons.Feather name='user' size={focused ? 22 : 18} color={color} />
        },
      }} />
      <StackTab.Screen name="Settings" component={Settings} 
      options={{
        tabBarBadge: 9,
        tabBarIcon: ({ focused, color, size }) => <Icons.Feather name='settings' size={focused ? 22 : 18} color={color} />,
      }} />
    </StackTab.Navigator>
  );
};

export default AppNavigation;