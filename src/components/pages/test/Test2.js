import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {toast,deviceInfo} from '../../../utils'
export default class test2 extends Component<{}> {


    componentDidMount() {

    }
    render() {
        let num=this.props.testSum;
        return (
            <View style={styles.contain}>
                <TouchableOpacity onPress={()=>Actions.pop()}>
                     <Text>返回</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                   <Text style={{marginTop:50}}>helloworld{num}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.getText()}>
                    <Text style={{marginTop:50}}>对上一个页面的数字+30</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>Actions.loadingScene()}>
                    <Text style={{marginTop:50}}>打开进度条</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>toast.showShortCenter('hello')}>
                    <Text style={{marginTop:50}}>show toast</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.drawer()}>
                    <Text style={{marginTop:50}}>进入底部导航栏</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent:'center'
    },

});