import React, {Component} from 'react';
import {Button,  View, Text} from "react-native";

export default class Sign extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: "User",
        };
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Sign Screen</Text>
            </View>
        );
    }
}