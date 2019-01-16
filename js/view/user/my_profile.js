import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ScrollView, Switch, TextInput,TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../../util/px2dp';
import theme from '../../config/theme';
import PageComponent from './BackPageComponent';
import my_profile_data from "../../data/myprofile";



export default class SettingPage extends PageComponent{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    static propTypes = {
        name: PropTypes.string,
        phone_num: PropTypes.string,
        mail: PropTypes.string,
        id_card: PropTypes.string,
        city: PropTypes.string,
        degree: PropTypes.bool,
        marital: PropTypes.string,

    };

    render(){
        //let my_profile_data = require("../../data/myprofile");
        const {name, phone_num, mail, id_card, city, degree, marital} = this.props;
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item text="姓名" isHasInput={true} placeholder={my_profile_data.my_profile.name?my_profile_data.my_profile.name:"请输入姓名"}/>
                        <Item text="手机号" subText={"188-8888-888"}/>
                        <Item text="邮箱" isHasInput={true} placeholder={"请输入邮箱"} />
                        <Item text="身份证" isHasInput={true} placeholder={"请输入身份证号"}/>
                        <Item text="所在城市" subText={"请选择"} isHasSwitcher={true}/>
                        <Item text="文化程度" subText={"请选择"}/>
                        <Item text="婚姻状况" subText={"请选择"}/>
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
            switchIsOn: this.props.switcherValue
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

    static defaultProps = {
        textColor: '#000',
        switcherValue: false,
        text: '',
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
                            { isHasSwitcher ?
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
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}/>
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

class UselessTextInput extends Component {
    render() {
        return (
            <TextInput
                // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable = {true}
                maxLength = {18}
            />
        );
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
