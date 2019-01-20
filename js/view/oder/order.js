import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput, StatusBar, Platform
} from 'react-native';
import theme from "../../config/theme";
import Button from '../../component/Button';


import BouncingPreloader from "react-native-bouncing-preloader";
const icons = [
    "https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759908_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759956_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759954_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759906_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759921_food_512x512.png"
];

//默认应用的容器组件
export default class Order extends Component {

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "账单",

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

    //构造函数
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    //输入框文字改变时会调用
    updateText(newText) {
        this.setState((oldState) => {
            console.log(oldState);//老的状态值
            return {
                text: newText
            }
        }, this.updateTextDone)
    }

    //文字状态值改变，界面渲染完毕后调用
    updateTextDone() {
        console.log("文字状态值改变，界面渲染完毕!");
    }

    onPress1(){
        this.props.navigation.navigate('Detail');
        //this.props.navigation.navigate("Detail");
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,marginTop: 20 }}>


                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,marginTop: 80 }}>
                    <BouncingPreloader
                        icons={
                            [
                                require('../../image/ic_login_logo.png'),
                                require('../../image/ic_login_logo.png'),
                            ]
                        }
                        leftDistance={-100}
                        rightDistance={-150}
                        speed={1500}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" , flexDirection: 'row'}}>
                    <Button text={"go detail"} onPress={this.onPress1.bind(this)}/>
                </View>
            </View>
        );
    }
}

//样式定义
const styles = StyleSheet.create({
    flex:{
        flex: 1,
    },
    topStatus:{
        marginTop:25,
    },
    input:{
        height:45,
        borderWidth:1,
        marginLeft: 5,
        paddingLeft:5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    tip:{
        marginLeft: 5,
        marginTop: 5,
        color: '#C0C0C0',
    }
});
