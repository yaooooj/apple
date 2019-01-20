import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Alert, View, Text, ScrollView, Switch, TextInput,TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, AsyncStorage, SafeAreaView} from 'react-native';

import Dialog from "react-native-dialog";

import px2dp from '../../util/px2dp';
import theme from '../../config/theme';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-general-actionsheet';
import {storage} from '../../util/storage';

let obj = {};
obj.name = '';
obj.phone_num = '';
obj.mail = '';
obj.id_num = '';
obj.city = '深圳';
obj.degree = '';
obj.marital = '';



export default class SettingPage extends Component{
    static navigationOptions = {
        title: '我的资料'
    };

    constructor(props){
        super(props);
        storage.save("myproflie", obj);
        this.state = {
            name: "",
            phone_num: "",
            mail: "",
            id_card: "",
            city: "",
            degree: "",
            marital: "",
            isHasSwitch: PropTypes.bool,
            dialogVisible: false,
            title:"",
            alertText: "",
        };

    }

    static propTypes = {
        name: PropTypes.string,
        phone_num: PropTypes.string,
        mail: PropTypes.string,
        id_card: PropTypes.func,
        city: PropTypes.bool,
        degree: PropTypes.bool,
        marital: PropTypes.bool,

    };

    static defaultProps = {
        //dialogVisible: false,
    };

    //准备加载组件
    componentWillMount() {
        //console.warn("componentWillMount");
        storage.load(
            "myprofile",
            (data) => {
                this.props.name = data.name
            })
    }

    componentDidMount() {
        //console.warn("componentDidMount")
        storage.load(
            "myprofile",
            (data) => {
                this.setState({name:data.name});
                this.setState({phone_num:data.phone_num});
                this.setState({mail:data.mail});
                this.setState({id_card:data.id_card});
                this.setState({city:data.city});
            })
    }


    showDialog(){
        this.setState({dialogVisible: true});

    }

    handleCancel(){
        this.setState({dialogVisible: false});
    }

    handleOK(){
        this.saveKeyByName(this.state.title);
        this.setState({dialogVisible: false});
    }

    saveKeyByName(title){
        switch (title) {
            case "姓名":
                obj.name =  this.state.alertText;
                storage.save("myprofile", obj);
                this.setState({name: this.state.alertText});
                break;
            case "手机号":
                obj.phone_num =  this.state.alertText;
                storage.save("myprofile", obj);
                this.setState({phone_num: this.state.alertText});
                break;
            case "邮箱":
                obj.mail =  this.state.alertText;
                storage.save("myprofile", obj);
                this.setState({mail: this.state.alertText});
                break;
            case "身份证号":
                obj.id_num =  this.state.alertText;
                storage.save("myprofile", obj);
                this.setState({id_card: this.state.alertText});
                break;
        }

    }


    _onPressCallback(position){
        switch (position) {
            case 0:
                this.sheetList(['未婚',"已婚",'取消'],2, "婚姻");
                break;
            case 1:
                this.sheetList(['大专', "本科", '硕士', "其他", '取消'],4, "学历");
                break;
            case 2:  //选择城市

                break;
            case 3:  //输入姓名
                this.setState({title: "姓名"});
                this.showDialog();
                break;
            case 4:  //输入手机号
                this.setState({title: "手机号"});
                this.showDialog();
                break;
            case 5:  //邮箱
                this.setState({title: "邮箱"});
                this.showDialog();
                break;
            case 6:  //身份证
                this.setState({title: "身份证号"});
                this.showDialog();
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
                            obj.marital = "未婚1";
                            storage.save("myprofile", obj);
                            this.setState({phone_num: "未婚2",});
                            break;
                        case 1:
                            this.setState({marital: "已婚",});
                            obj.marital = "未婚1";
                            storage.save("myprofile", obj);
                            this.setState({isHasSwitcher: true,});
                            break;
                    }
                }
            },
        );
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item icon="user" iconColor={theme.textColor} text="姓名"  subText={this.state.name?this.state.name:"请输入姓名"} textPress={this._onPressCallback.bind(this, 3)}/>
                        <Item icon="phone" iconColor={theme.textColor} text="手机号" subText={this.state.phone_num?this.state.phone_num:"请输入手机号"} textPress={this._onPressCallback.bind(this, 4)}/>
                        <Item icon="mail" iconColor={theme.textColor} text="邮箱"  subText={this.state.mail?this.state.mail:"请输入邮箱"} textPress={this._onPressCallback.bind(this, 5)}/>
                        <Item icon="credit-card" iconColor={theme.textColor} text="身份证" subText={this.state.id_card?this.state.id_card:"请输入身份证号"} textPress={this._onPressCallback.bind(this, 6)}/>
                        <Item icon="heart" iconColor={theme.textColor} text="所在城市" subText={this.state.city?this.state.city:"请选择"}  onPress={this._onPressCallback.bind(this, 2)}/>
                        <Item icon="heart" iconColor={theme.textColor} text="文化程度" subText={this.state.degree?this.state.degree:"请选择"} onPress={this._onPressCallback.bind(this, 1)}/>
                        <Item icon="heart" iconColor={theme.textColor} text="婚姻状况" subText={this.state.marital?this.state.marital:"请选择"} onPress={this._onPressCallback.bind(this, 0)}/>
                    </View>
                </ScrollView>
                    <View>
                        <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>{"请输入" + this.state.title}</Dialog.Title>
                            <Dialog.Input onChangeText={(text) => {this.setState({alertText: text})}}/>
                            <Dialog.Button label="Cancel" onPress={this.handleCancel.bind(this)} />
                            <Dialog.Button label="OK" onPress={this.handleOK.bind(this)} />
                        </Dialog.Container>

                    </View>
            </View>
        );
    }
}

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchIsOn: this.props.switcherValue,
            text1: '',
            onTextChange: this.props.onPress,
            newText: this.props.length,
            value: this.props.value
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
        value: PropTypes.string,
        textPress: PropTypes.func,
        iconColor: PropTypes.string,
        icon: PropTypes.string.isRequired,
    };

    static defaultProps = {
        textColor: '#000',
        switcherValue: false,
        text: '',
        iconColor: 'grey'
    };

    handleChange(text1){
        //this.setState({text1});
        this.setState((oldtext) => {
            return {
                text1: text1
            }
        })
    }

    testBlur(){

        this.refs.inputWR.blur();
    }

    validLength(){
        //alert(this.state.text.length)
        if (this.state.text1.length <= 0){
            return null
        }
        if (this.state.text1.length < 11) {
            obj.phone_num = "未婚1";
            storage.save("myprofile", obj);
        }
    }

    render(){
        const {text, textColor, subText, onPress, isHasSwitcher, textPress, iconColor, icon, isHasInput, placeholder} = this.props;
        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Feather name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: textColor, fontSize: px2dp(12), marginLeft: px2dp(10)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#000"}}>{subText}</Text>
                            { isHasSwitcher ?
                                <SafeAreaView>
                                    <Switch
                                        onValueChange={(value) => this.setState({switchIsOn: value})}
                                        style={{marginLeft: px2dp(5)}}
                                        value={this.state.switchIsOn}/>
                                </SafeAreaView>
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
                        <Feather name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: textColor, fontSize: px2dp(15), marginLeft: px2dp(10)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#ccc"}} onPress={textPress}>{subText}</Text>
                            { isHasSwitcher ?
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
                                    maxLength={20}
                                    onChangeText={ (text1) => this.handleChange(text1)}
                                    value={this.state.text}
                                    onBlur={()=> { this.validLength()}}
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
    list: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(12)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(10),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1 / PixelRatio.get() * 2
    },
});