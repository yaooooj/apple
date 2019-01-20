'use strict';

import React, {Component, } from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, PixelRatio, TouchableNativeFeedback, TouchableOpacity, ToastAndroid, Alert, AlertIOS, ScrollView} from 'react-native';
import px2dp from '../../util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../component/Button';
import theme from '../../config/theme';
import Avatar from '../../component/Avatar';
import TextButton from '../../component/TextButton';
import About from './about';
import Login from './login';

export default class MeFragment extends Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "个人中心",
        };
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    _onPressCallback(position){
        switch(position){
            case 0:  //title
                this.props.navigation.navigate("Login");
                break;

            case 1:  // add occupation
                this._alert();
                break;

            case 2:  //collection
                this._alert();
                break;

            case 3:  //my profile
                this.props.navigation.navigate('MyProfile');
                break;

            case 4:  //setting
                this.props.navigation.navigate('About');
                break;
            case 5:  //setting
                this.props.navigation.navigate('FeedBack');
                break;
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    {Platform.OS === 'android' ?
                        <TouchableNativeFeedback onPress={this._onPressCallback.bind(this, 0)}>
                            <View style={styles.intro}>
                                <Avatar image={require('../../image/ic_login_logo.png')} size={px2dp(55)} textSize={px2dp(20)}/>
                                <View style={{marginLeft: px2dp(12)}}>
                                    <Text style={{color: theme.text.color, fontSize: px2dp(20)}}>React_Native</Text>
                                    <TextButton text="添加职位 @添加公司" color="#949494" fontSize={px2dp(13)} onPress={this._onPressCallback.bind(this, 0)}/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        :
                        <TouchableOpacity onPress={this._onPressCallback.bind(this, 0)} activeOpacity={theme.btnActiveOpacity}>
                            <View style={styles.intro}>
                                <Avatar image={require('../../image/ic_login_logo.png')} size={px2dp(55)} textSize={px2dp(20)}/>
                                <View style={{marginLeft: px2dp(12)}}>
                                    <Text style={{color: "#fff", fontSize: px2dp(20)}}>WangdiCoder</Text>
                                    <TextButton text="添加职位 @添加公司" color="#fff" fontSize={px2dp(13)} onPress={this._onPressCallback.bind(this, 0)}/>
                                </View>

                            </View>
                        </TouchableOpacity>
                    }
                    <View style={styles.list}>
                        <Item icon="profile" iconColor={theme.textColor} text="我的申请"   onPress={this._onPressCallback.bind(this, 2)}/>
                        <Item icon="eyeo" text="我的资料" iconColor={theme.textColor} onPress={this._onPressCallback.bind(this, 3)}/>
                    </View>
                    <View style={styles.list}>
                        <Item icon="smileo" text="关于我们" iconColor={theme.textColor} onPress={this._onPressCallback.bind(this, 4)}/>
                        <Item icon="like2" text="用户反馈" iconColor={theme.textColor} onPress={this._onPressCallback.bind(this, 5)}/>


                    </View>
                </ScrollView>
            </View>
        );
    }

    _alert(){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }
    }
}

class Item extends Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        text: PropTypes.string.isRequired,
        subText: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        iconColor: 'gray'
    };

    render() {
        const {icon, iconColor, text, subText, onPress} = this.props;

        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <AntDesign name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        } else if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <AntDesign name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
    intro: {
        height: px2dp(165),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.textColor,
        padding: px2dp(20),
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        //marginTop: px2dp(10)
    },
    list:{
        flex: 1,
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(15)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1/PixelRatio.get() * 2
    }
});