import React, {Component} from 'react';
import {Button,  View, Text} from "react-native";
import { createStackNavigator, } from "react-navigation";




export default class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "Profile",
        };
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}
