import React, {Component} from 'react';
import {View, Text, StatusBar, Platform, StyleSheet, Image, ScrollView, Dimensions} from "react-native";
import theme from '../../config/theme';
import Button from "../../component/Button";
import px2dp from "../../util/px2dp";
import ImageButton from "../../component/ImageButton";
import Icon from "react-native-vector-icons/RNIMigration";



let width = Dimensions.get('window').width;//得到屏幕宽度



export default class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "Home",

        };
    };
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            if (Platform.OS === "android"){
                StatusBar.setBackgroundColor(theme.pageBck);
            }

        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    onPress(){

    }

    home_image_button(){
        return (
            <View style={{width: 100, height: 53,  marginLeft:10 }}>
                <ImageButton
                    text={"all"}
                    onPress={this.onPress}
                    backgroundColor={theme.textColor}
                    icon={'staro'}
                    color={'#fff'}
                    imgSize={30}
                />
            </View>
        )
    }


    home_button = ()=> {
        return (
            <View style={{flex:1, flexDirection: 'row', marginLeft: px2dp(10), marginTop:10}}>
                {this.home_image_button()}
                {this.home_image_button()}
                {this.home_image_button()}
            </View>
        );
    };



    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column',  justifyContent: 'flex-start', marginTop:10}}>

                <ScrollView style={styles.top}>
                    {this.home_button()}
                    {this.home_button()}
                    {this.home_button()}

                </ScrollView>

                <View style={styles.bottom}>


                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    top:{
        //backgroundColor: theme.textColor,
    },
    bottom:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: "center",
        margin: 20,
    }
});