import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ScrollView, Switch, TextInput,TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../../util/px2dp';
import theme from '../../config/theme';
import PageComponent from './BackPageComponent';
import my_profile_data from "../../data/myprofile";
import ActionSheet from 'react-native-general-actionsheet';
import DeviceStorage from '../../util/storage';


export default class SettingPage extends PageComponent{
    constructor(props){
        super(props);
        this.state = {
            isHasSwitcher: false,
            marital: "",
            degree: "",
        };
    }

    static propTypes = {
        name: PropTypes.string,
        phone_num: PropTypes.string,
        mail: PropTypes.string,
        id_card: PropTypes.string,
        city: PropTypes.string,
       // degree: PropTypes.bool,
       // marital: PropTypes.string,

    };


    _onPressCallback(position){
        switch (position) {
            case 0:
                this.sheetList(['未婚',"已婚",'取消'],2, "婚姻");
                break;
            case 1:
                this.sheetList(['大专', "本科", '硕士', "其他", '取消'],4, "学历");
                break;
        }
    }

    sheetList(list, num, sheet){
        ActionSheet.showActionSheetWithOptions(
            {
                options: list,
                cancelButtonIndex: num,
            },
            (buttonIndex) => {
                if (sheet==="学历") {
                    switch (buttonIndex) {
                        case 0:
                            this.setState({degree:"大专",});
                            break;
                        case 1:
                            this.setState({degree: "本科",});
                            break;
                        case 2:
                            this.setState({degree: "硕士",});
                            break;
                        case 3:
                            this.setState({degree: "其他",});
                            break;
                    }
                }else {
                    switch (buttonIndex) {
                        case 0:
                            this.setState({marital:"未婚",});
                            break;
                        case 1:
                            this.setState({marital: "已婚",});
                            this.setState({isHasSwitcher: true,});
                            break;
                    }
                }

            },
        );
    }


    onInputText(){
        alert("bu hui l ")
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item text="姓名" isHasInput={true} placeholder={"请输入姓名"} onPress={this.onInputText}/>
                        <Item text="手机号" isHasInput={true} subText={"请输入手机号"}/>
                        <Item text="邮箱" isHasInput={true} placeholder={"请输入邮箱"} />
                        <Item text="身份证" isHasInput={true} placeholder={this.state.isHasSwitcher?" ":"请输入身份证号"}/>
                        <Item text="所在城市" subText={"请选择"} isHasSwitcher={this.state.isHasSwitcher}/>
                        <Item text="文化程度" subText={this.state.degree?this.state.degree:"请选择"} onPress={this._onPressCallback.bind(this, 1)}/>
                        <Item text="婚姻状况" subText={this.state.marital?this.state.marital:"请选择"} onPress={this._onPressCallback.bind(this, 0)}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchIsOn: this.props.switcherValue,
            HasSwitcher: this.props.isHasSwitcher,
            text1: '',
            onTextChange: this.props.onPress,
        };

    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func,
        isHasSwitcher: PropTypes.bool,
        isHasInput: PropTypes.bool,
        switcherValue: PropTypes.bool,
        placeholder: PropTypes.string,
    };


    handleChange(text1){
        this.setState({text1});

    }

    testBlur(){
        this.refs.inputWR.blur();
    }

    validLength(){
        alert(this.state.text1.length)
    }


    static defaultProps = {
        textColor: '#000',
        switcherValue: false,
        isHasSwitcher: false,
    };

    render(){
        const {text, textColor, subText, onPress, isHasSwitcher, switcherValue, isHasInput, placeholder} = this.props;

        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(12)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                            { this.state.HasSwitcher ?
                                <Switch
                                    onValueChange={(value) => this.setState({switchIsOn: value})}
                                    style={{marginLeft: px2dp(5)}}
                                    value={this.state.switchIsOn}/>
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(15)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                            {this.state.HasSwitcher ?
                                <Switch
                                    onValueChange={(value) => this.setState({switchIsOn: value})}
                                    style={{marginLeft: px2dp(5)}}
                                    value={this.state.switchIsOn}/>
                                :
                                null
                            }
                            { isHasInput ?
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {1}
                                    placeholder = {placeholder}
                                    onChangeText={ (text) => this.handleChange.bind(this, text)}
                                    value={this.state.text}
                                    onEndEditing={()=> { this.validLength()}}
                                    onSubmitEditing={()=>{this.testBlur()}}
                                />
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}


const styles = StyleSheet.create({
    list:{
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(12)
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
        borderBottomWidth: 1/PixelRatio.get()*2
    },
});
