/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ToastAndroid} from 'react-native';
import { createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
  createBottomTabNavigator,
} from 'react-navigation';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import theme from './js/config/theme';

import Home from './js/view/home/home';

import Order from './js/view/oder/order';
import Detail from './js/view/oder/detail';

import User from './js/view/user/user';
import Profile from './js/view/user/profile';
import Login from './js/view/user/login';
import About from './js/view/user/about';
import MyProfile from './js/view/user/my_profile';
import FeedBack from './js/view/user/feedback';
import Scoring from './js/view/user/scoring';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer/>;
  }

}


const HomeStack = createStackNavigator(
    {
        Home: Home,
        MyProfile: MyProfile,
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.pageBck,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const OderStack = createStackNavigator(
    {
        Order: Order,
        Detail: Detail,
    },
    {
        initialRouteName: 'Order',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.textColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const UserStack = createStackNavigator(
    {
        Login: Login,
        User: User,
        Profile: Profile,
        About: About,
        FeedBack: FeedBack,
        Scoring: Scoring,

    },
    {
        initialRouteName: 'Profile',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.textColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);



UserStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

const getTabIcon = (navigation, focused, activeTintColor ) => {
    const { routeName } = navigation.state;
    let IconComponent = AntDesign;
    let iconName;
    if (focused){
        ToastAndroid
    }
    if (routeName === '贷款') {
        iconName = `home${focused ? '' : ''}`;
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
    } else if (routeName === '账单') {
        iconName = `bars${focused ? '' : ''}`;
    }else if (routeName === '我的') {
        iconName = `user${focused ? '' : ''}`;
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={activeTintColor} />;
};

const TabNavigator = createBottomTabNavigator(
    {
        贷款: {screen:HomeStack,},
        账单: {screen:OderStack,},
        我的: {screen:UserStack,},
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                // getTabBarIcon(navigation, focused, tintColor),
                getTabIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: theme.textColor,
            inactiveTintColor: 'gray',

        },
    }
);

const AppContainer = createAppContainer(TabNavigator);

