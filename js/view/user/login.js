import React, {Component} from 'react';
import {  View, Text, TextInput, Image, PixelRatio, BackHandler, StyleSheet, Platform} from "react-native";

import AntDesign from 'react-native-vector-icons/AntDesign';

import px2dp from '../../util/px2dp';
import Button from '../../component/Button';
import ImageButton from '../../component/ImageButton';
import TextButton from '../../component/TextButton';


import Sign from './my_profile';





export default class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "我的",
        };
    };


    constructor(props){
        super(props);
        this.handleBack = this._handleBack.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    _handleBack() {
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            alert('hello');
            return true;
        }
        return false;
    }

    _signupCallback(){
        this.props.navigator.push({
            component: Sign
        });
    }

    _forgetPassword(){

    }

    render() {
        return (
            <View style={styles.view}>

                <View style={styles.logo}>
                    <Image  style={{width:px2dp(45), height:px2dp(45)}} source={require('../../image/ic_login_logo.png')}/>
                    <Text style={{margin: 20, color: '#fff'}}>
                        让借钱变得更简单
                    </Text>
                </View>
                <View style={styles.editGroup}>
                    <View style={styles.editView1}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="手机号/邮箱"
                            placeholderTextColor="#c4c4c4"/>
                    </View>
                    <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.editView2}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="密码"
                            placeholderTextColor="#c4c4c4"/>
                    </View>
                    <View style={{marginTop: px2dp(10), height: px2dp(40)}}>
                        <Button text="登录" onPress={this._handleBack.bind(this)}/>
                    </View>
                    <View style={styles.textButtonLine}>
                        <TextButton text="忘记密码?" onPress={this._forgetPassword.bind(this)} color="rgba(255,255,255,0.5)"/>
                        <TextButton text="注册账号" onPress={this._signupCallback.bind(this)}/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'rgb(22,131,251)'
    },
    actionBar:{
        marginTop: (Platform.OS === 'ios') ? px2dp(10) : 0,
    },
    logo:{
        alignItems: 'center',
        marginTop: px2dp(40)
    },
    edit:{
        height: px2dp(40),
        fontSize: px2dp(13),
        backgroundColor: '#fff',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15)
    },
    editView1:{
        height: px2dp(48),
        backgroundColor:'white',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    editView2:{
        height: px2dp(48),
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    editGroup:{
        margin: px2dp(20)
    },
    textButtonLine:{
        marginTop: px2dp(12),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thirdPartyView:{
        flex: 1,
        marginTop: px2dp(10),
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent:'space-around'
    }

});