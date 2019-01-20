import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    PixelRatio,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform, Alert, AlertIOS
} from "react-native";
import px2dp from "../../util/px2dp";
import DisButton from '../../component/DisButton';
import JsonUtil from "../../util/JsonUtil";






export default class FeedBack extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: "反馈",

        };
    };

    constructor(props) {
        super(props);
        this.state = {
            height: 300,
            disabled: false,
            text: '提交',
        }
    }

    static defaultProps = {
        //text: '提交',
    };


    _alert(msg){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                {msg},
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            let str = JSON.stringify(msg);
            AlertIOS.alert(
                'Message',
                {str},
                [{text: 'OK', onPress: () => {}}]
            );
        }
    }


    onPress(){
        this.setState({waiting: true});
        this.setState({disabled:true});
        this.setState({text:"提交中"});
        setTimeout(()=> {

            this.setState({waiting: false});
            this.alert('提交成功');
            this.setState({text:"提交"});
            this.setState({disabled:false});
        }, 2000);//设置的时间间隔由你决定

        //这里处理提交成功后的逻辑，需要设置按钮可以点击
    }


    cauculateHeight(e) {
        const height = e.nativeEvent.contentSize.height > 30 ? e.nativeEvent.contentSize.height : this.state.height;
        this.setState({height});
    }

    render() {
        const {} = this.props;
        return (
            <View style={styles.contain}>
                <TouchableOpacity
                    activeOpacity = {1}
                    style = {styles.inputContainer}
                    onPress = {() => this.TextInput.focus()}
                >
                    <TextInput
                        height = {250}
                        borderWidth={1}
                        borderColor = {'#ccc'}
                        margin = {5}
                        placeholder = {'感谢您提出宝贵的建议'}
                        placeholderTextColor = {'#bbbbbb'}
                        underlineColorAndroid = {'transparent'}
                        multiline = {true}
                        ref = {textInput => this.TextInput = textInput}
                        maxHeight={300}
                        //onContentSizeChange = {e => this.cauculateHeight(e)}
                        style = {[{paddingVertical: 0, paddingLeft: 5, fontSize: 16}, {height: this.state.height}]}
                    />
                </TouchableOpacity>

                <View style={{marginTop: px2dp(10), height: px2dp(40)}}>
                    <DisButton text={this.state.text} onPress={this.onPress.bind(this)} disabled={this.state.disabled}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    contain:{
        flex: 1,
        flexDirection: 'column',
    },
    input:{
        height:40,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        alignSelf:'center',
    },


});
