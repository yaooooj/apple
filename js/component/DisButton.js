'use strict';

import React,{Component,  } from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableHighlight, TouchableNativeFeedback} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class DisButton extends Component{
    static propTypes = {
        text: PropTypes.string,
        onPress: PropTypes.func,
        backgroundColor: PropTypes.string,
        disabled: PropTypes.bool,
        disableBackgroundColor: PropTypes.string,
    };

    static defaultProps = {
        backgroundColor: '#046ada',
        disableBackgroundColor: '#ccc',
        disabled: false,
    };

    render(){

        if(Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    style={{flex: 1, height: px2dp(45)}}
                    onPress={this.props.onPress}
                    activeOpacity={this.props.disabled?1:theme.btnActiveOpacity}>
                    {this._renderContent()}
                </TouchableHighlight>
            );
        }
    }

    _renderContent(){
        return(
            <View style={{
                flex: 1,
                height: px2dp(45),
                backgroundColor: this.props.disabled?this.props.disableBackgroundColor:this.props.backgroundColor,
                alignItems:'center',
                justifyContent:'center',
                borderRadius: 3,
            }}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: px2dp(13),
    },
});