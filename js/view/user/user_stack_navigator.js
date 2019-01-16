import createStackNavigator from  'react-navigation'
import React, {Component} from 'react';


import User from "./user";
import Profile from "./profile";


const UserStack = createStackNavigator(
    {
        User: User,
        Profile: Profile,
    },
);



export default class UserStackNavigator extends Component<Props>{




}