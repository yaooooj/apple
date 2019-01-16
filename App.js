/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
  createBottomTabNavigator,
} from 'react-navigation';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';



import Home from './js/view/home/home';
import Oder from './js/view/oder/oder';
import User from './js/view/user/user';
import Profile from './js/view/user/profile';
import Login from './js/view/user/login';
import About from './js/view/user/about';
import MyProfile from './js/view/user/my_profile';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer/>;
  }

}


const HomeStack = createStackNavigator({
    Home: Home,
});

const OderStack = createStackNavigator({
    Oder: Oder,
});

const UserStack = createStackNavigator(
    {
        Login: Login,
        User: User,
        Profile: Profile,
        About: About,
        MyProfile: MyProfile,

    },
    {
        initialRouteName: 'Profile',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'rgb(22,131,251)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    if (routeName === 'Home') {
        return <AntDesign name='home' size={25} color='red' />;
    } else if (routeName === 'Oder') {
        return <Octicons name='three-bars' size={25} color='red'/>;
    }else if (routeName === 'User') {
        return <AntDesign name='user' size={25} color='red' />;
    }
};

const TabNavigator = createBottomTabNavigator(
    {
      Home: { screen: HomeStack, },
      Oder: { screen: OderStack, },
      User: {screen: UserStack, },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }

);

const AppContainer = createAppContainer(TabNavigator);

