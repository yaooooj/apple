
import React, {Component} from 'react';
import {
    View,
    Text,
    StatusBar,
    Platform,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    TextInput,
    PixelRatio, TouchableOpacity
} from "react-native";
import PropTypes from 'prop-types';
import theme from '../../config/theme';
import Button from "../../component/Button";
import ImageButton from "../../component/ImageButton";
import {Card, ThemeProvider} from 'react-native-elements';

import IndicatorViewPage from "../../component/banner/IndicatorViewPager";
import PagerDotIndicator from "../../component/banner/PageDotIndactor";
import px2dp from "../../util/px2dp";
import {storage} from '../../util/storage';


let width = Dimensions.get('window').width;//得到屏幕宽度

let profile = {};
profile.name = '';
profile.phone_num = '';
profile.mail = '';
profile.id_num = '';
profile.city = '深圳';
profile.degree = '';
profile.marital = '';


let user = {};
user.isLogin = true;
user.isNormal = false;
user.account = '';
user.id = '';
user.uid = '';



export default class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: "我的贷款",
        };
    };

    constructor(props) {
        super(props);
        storage.save('profile', profile);
        storage.save('user', user);
        this.state = {
            text: '3000',
            autoFocus: false,
            numberLimit: '',
            isFocus: false,
            isLogin: PropTypes.bool,
        };
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            if (Platform.OS === "android"){
                StatusBar.setBackgroundColor(theme.pageBck);
            }
        });
        storage.load(
            "user",
            (data) => {
                this.setState({isLogin:data.isLogin});
            })
    }



    componentWillUnmount() {
        this._navListener.remove();
    }

    onPressMoney = (obj) => {
        obj = obj.replace(/[^\d.]/g, "");
        //必须保证第一位为数字而不是.
        obj = obj.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //this.setState({isFocus: true});
        return obj
    }



    home_image_button(number,iconname){
        return (
            <View style={{width: 100, height: 53, padding: 5 ,marginTop:5}}>
                <ImageButton
                    text={number + '期'}
                    onPress={this.onPress}
                    icon={iconname}
                    color={theme.textColor}
                    imgSize={30}
                />
            </View>
        )
    }


    home_button = (id)=> {
        return (
            id === 'row1' ?
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly'}}>
                    {this.home_image_button(3,'ios-phone-portrait')}
                    {this.home_image_button(6,'ios-camera')}
                    {this.home_image_button(9,'ios-laptop')}
                </View>
                :
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly'}}>
                    {this.home_image_button(12,'ios-cart')}
                    {this.home_image_button(18,'ios-car')}
                    {this.home_image_button('自定义','ios-airplane')}
                </View>
        );
    };

    money = () => {
        return (
            <View style={styles.money} >

                <TextInput
                    keyboardType={'numeric'}
                    //backgroundColor = '#fff'
                    fontSize = {25}
                    style={{alignSelf: 'center', color: theme.textColor}}
                    placeholder = {this.state.isFocus?'':'3000'}
                    placeholderTextColor = {theme.textColor}
                    onChangeText={ (text1) => {
                        this.setState({numberLimit: this.onPressMoney(text1)})
                    }}
                    value={this.state.numberLimit}
                    //autoFocus={}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    };

    commitButton = () =>{
        if (this.state.isLogin){
            this.props.navigation.navigate('Login')
        } else {
            this.props.navigation.navigate('MyProfile')
        }
    };

    _renderDotIndicator = () => {
        return <PagerDotIndicator pageCount={3}/>;
    };

    staging = ()=>{
        return (
            <View>
                {this.home_button('row1')}
                {this.home_button('row2')}
            </View>

        )
    };


    moreView = () => {
            return (
                <View style={{flex:1 , flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15}}>
                    <ImageButton
                        text={'借钱指南'}
                        onPress={this.onPress}
                        icon={'ios-resize'}
                        color={theme.textColor}
                        imgSize={24}
                        fontSize={12}

                    />
                    <View style={{width: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    <ImageButton
                        text={'还款指南'}
                        onPress={this.onPress}
                        icon={'ios-resize'}
                        color={theme.textColor}
                        imgSize={24}
                        fontSize={12}
                    />
                    <View style={{width: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    <ImageButton
                        text={'额度指南'}
                        onPress={this.onPress}
                        icon={'ios-resize'}
                        color={theme.textColor}
                        imgSize={24}
                        fontSize={12}
                    />
                </View>
            )

    };



    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column',  justifyContent: 'flex-start', marginTop:5}}>
                <ScrollView >
                    <View style={styles.banner}>
                        <IndicatorViewPage
                            style={{height:160, flex:1, backgroundColor:'white', pageMargin: 40}}
                            autoPlayEnable  = {true}
                            indicator={this._renderDotIndicator()}>
                            <View style={{backgroundColor:theme.textColor,}}>
                                <Text>page one</Text>
                            </View>
                            <View style={{backgroundColor:'cornflowerblue'}}>
                                <Text>page two</Text>
                            </View>
                            <View style={{backgroundColor:'#1AA094'}}>
                                <Text>page three</Text>
                            </View>
                        </IndicatorViewPage>
                    </View>

                    <View style={styles.top_scroll}>
                        <Text style={{fontWeight: 'bold'}}>申请金额</Text>
                    </View>
                    <View>
                        {this.money()}
                    </View>
                    <View style={styles.top_scroll}>
                        <Text style={{fontWeight: 'bold'}}>选择分期数</Text>
                    </View>
                    <View style={styles.staging}>
                        {this.staging()}
                    </View>

                    <View style={styles.commit}>
                        <View>
                            <Button text={'快速申请'} onPress={this.commitButton} backgroundColor={'#fff'} color={theme.textColor}/>
                        </View>
                    </View>

                    <View style={{margin: 15}}>
                        <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    </View>
                    <View style={styles.more}>
                        {this.moreView()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    top_scroll:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop:10,
        marginLeft: 15

    },
    bottom:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: "center",
        margin: 20,

    },
    money:{
        borderWidth: 1,
        margin: 15,
        marginBottom: 5,
        height: px2dp(45),
        justifyContent: 'center',
        borderColor: theme.textColor
    },
    staging:{
        flex:1,
        flexDirection:'column',
        borderWidth:1,
        margin: 15,
        marginBottom: 5,
        justifyContent: 'space-evenly',
        padding: 10,
        borderColor: theme.textColor
    },
    commit:{
        margin: 15,
        marginBottom: 20,
    },
    banner:{

    },
    more:{

    },
    img:{
        height: 50,
        width:100
    }
})