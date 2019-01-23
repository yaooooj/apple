'use strict';

import React,{ Component } from 'react';
import PropTypes from 'prop-types'
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image,ViewPropTypes} from 'react-native';
import px2dp from '../util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ImageButton extends Component{

    static propTypes = {
        text: PropTypes.string,
        image: PropTypes.number,
        icon: PropTypes.string,
        onPress: PropTypes.func,
        imgSize: PropTypes.number,
        fontSize: PropTypes.number,
        color: PropTypes.string,
        btnStyle:  ViewPropTypes.style,
        isRunning: false,
    };

    static defaultProps = {
        imgSize: px2dp(40),
        fontSize: px2dp(13)
    };



    // 开始倒计时
    start() {
        this.time = this.props.intervalTime;
        this.interval = setInterval(this.timer, 1000);

        if (this.props.autoFocus && this.input) {
            this.input.focus();
        }
    }
    // 结束倒计时
    stop() {
        clearInterval(this.interval);
        this.setState({
            buttonText: this.props.btnTextTimed,
            isRunning: false,
        });
        this.props.onStop();
    }

    // 倒计时函数
    timer() {
        if (this.time > 0) {
            this.setState({
                buttonText: this.props.btnTextTiming.replace('{time}', this.time),
            });
            this.time -= 1;
        } else {
            this.stop();
        }
    }

    render() {
        const {image, icon, onPress} = this.props;

        if (Platform.OS === 'ios') {
            if (image) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this._renderContentWithImage()}
                    </TouchableOpacity>
                );
            } else if (icon) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this._renderContentWithIcon()}
                    </TouchableOpacity>
                );
            }
        } else if (Platform.OS === 'android') {
            if (image) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithImage()}
                    </TouchableNativeFeedback>
                );
            } else if (icon) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithIcon()}
                    </TouchableNativeFeedback>
                );
            }
        }
    }

    _renderContentWithImage(){
        const {text, image, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Image source={image} style={{width: imgSize, height: imgSize}}/>
                {text ?
                    <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }

    _renderContentWithIcon(){
        const {text, icon, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Icon name={icon} size={imgSize} color={color}/>
                {text ?
                    <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: theme.textColor,
        borderRadius: 3,
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        marginTop: px2dp(4)
    }
});