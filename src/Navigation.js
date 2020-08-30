import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';



const AuthStackNavigator = createStackNavigator({
     Login: {
       screen: Login,
     },
     Register: {
      screen: Register,
    }
  }, { headerMode: 'none'});

   const AppStackNavigator = createStackNavigator({
     Home: {
       screen: Home,
       navigationOptions: {
         title: 'My Contacts ',
         headerTitleAlign: 'center',
         headerStyle: {
          backgroundColor: '#61f2f5'
        },
        headerTitleStyle: {
          color: '#fa1616'
        }
       },
     },
     Chat: {
       screen: Chat,
       navigationOptions: {
        // title: 'Chat Room',
         headerTitleAlign: 'center',
         headerStyle: {
          backgroundColor: '#61f2f5'
        },
        headerTitleStyle: {
          color: '#fa1616'
        }
       } 
     },
   });




   const SwitchNavigator = createSwitchNavigator({
      AuthLoading: AuthStackNavigator,
      App: AppStackNavigator
    },
    {
      initialRouteName: 'AuthLoading',
    });


  const Navigation = createAppContainer(SwitchNavigator);
  export default Navigation;
