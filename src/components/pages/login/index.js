import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {deviceInfo} from '../../../utils'

export default class login extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = ({
            loginaccount: '',
            pwd: ''
        })
    }

    componentDidMount() {
        console.log("test", "componentDidMount")

    }

    componentWillReceiveProps(nextProps) {
        console.log("test", "nextProps"+nextProps.userinfo.statusCode)
    }

    submitLogin(){
        this.props.LOGIN({loginaccount:this.state.loginaccount,pwd:this.state.pwd,deviceno:this.state.loginaccount,devicesource:'2'})
    }

    render() {
        let aa=this.props.userinfo
        return (
            <ImageBackground style={styles.contain}
                             source={require('../../../image/login_1080_1920.png')}
            >
                <Text>aaaaaaaaa{aa.statusCode}</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.textContainer}>
                        <TextInput style={{width: deviceInfo.deviceWidth * 0.68, marginLeft: 5, padding: 0}}
                                   placeholder='请输入用户名'
                                   numberOfLines={1}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.setState({loginaccount: text})}
                                   defaultValue={this.state.loginaccount}
                        />
                    </View>
                    <View style={[styles.textContainer, {marginTop: 10}]}>
                        <TextInput style={{width: deviceInfo.deviceWidth * 0.68, marginLeft: 5, padding: 0}}
                                   placeholder='请输入密码'
                                   numberOfLines={1}
                                   secureTextEntry={true}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.setState({pwd: text})}
                                   defaultValue={this.state.pwd}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>this.submitLogin()}>
                    <View style={styles.loginbutton}>
                        <Text style={{fontSize: deviceInfo.deviceWidth * 0.047, color: 'white'}}>登 录</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        width: deviceInfo.deviceWidth * 0.7,
        height: deviceInfo.deviceWidth * 0.092,
        borderWidth: 1.5,
        borderRadius: deviceInfo.deviceWidth * 0.042,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    loginbutton: {
        width: deviceInfo.deviceWidth * 0.68,
        height: deviceInfo.deviceWidth * 0.08,
        borderRadius: deviceInfo.deviceWidth * 0.042,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f00',
        marginTop: 20
    }

});