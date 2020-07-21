import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';


const AuthStackNavigator = createStackNavigator({
     Login: {
       screen: Login,
     },
   }, {headerMode: 'none'});

   const SwitchNavigator = createSwitchNavigator(
     {
      AuthLoading:Login
    },
    {
      initialRouteName: 'AuthLoading',
    },
  );


  const Navigation = createAppContainer(SwitchNavigator);
  export default Navigation;
