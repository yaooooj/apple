import React, {Component} from 'react';
import {Button,  View, Text, FlatList} from "react-native";
import Login from './login'


export default class User extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "User",
        };
    };

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            text: '',


        }
    }




    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <FlatList
                    renderItem={}
                    data={}
                    initialNumToRender={}
                    keyExtractor={}
                    numColumns={}
                    getItem={}
                    getItemCount={}
                    disableVirtualization={}
                    maxToRenderPerBatch={}
                    updateCellsBatchingPeriod={}
                    windowSize={}
                />
            </View>
        );
    }
}

