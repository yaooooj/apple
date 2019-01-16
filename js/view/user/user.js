import React, {Component} from 'react';
import {Button,  View, Text} from "react-native";
import Login from './login'




export default class User extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "User",
        };
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button
                    title={'go login'}
                    onPress={() => this.props.navigation.push({
                        component: Login,
                    })}
                />
            </View>
        );
    }
}

