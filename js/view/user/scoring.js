import React, {Component} from 'react';
import {Button, View, Text, Dimensions} from "react-native";


let height = Dimensions.get('window').height;//得到屏幕宽度


export default class Scoring extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "商务合作",
        };
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", }}>
                <View style={{marginTop: height *1/6, alignItems: "center",}}>
                    <Text style={{fontSize:18, color: '#000'}}>商务合作</Text>
                    <Text style={{margin: 16, fontSize:16, color: '#000'}}>微信：xxx-xxx-xxx</Text>
                    <Text style={{fontSize:16, color: '#000'}}>Mail：xxx-xxx-xxx</Text>
                </View>
                <View style={{marginTop: height *3/6, alignItems: "center"}}>
                    <Text style={{color: '#ccc'}}>顺借 1.0.3 - shun.jie.io</Text>
                </View>
            </View>
        );
    }
}
