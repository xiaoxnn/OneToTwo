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
import   {Actions} from 'react-native-router-flux'
import  {deviceInfo}  from '../../../utils'
export default class TabView4 extends Component<{}> {

    constructor(props){
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.contain}>
                <View style={styles.item}>
                    <Text style={styles.text}>Demo集合</Text>
                </View>
                <View style={styles.line}/>
                <TouchableOpacity onPress={()=>Actions.Test3() }>
                    <View style={styles.item}>
                        <Text style={styles.text}>动画</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.SelectAddressAndTime() }>
                    <View style={styles.item}>
                        <Text style={styles.text}>选择地址与时间</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.PlayVideo() }>
                    <View style={styles.item}>
                        <Text style={styles.text}>播放视频</Text>
                    </View>
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

    },
    item:{
        width:deviceInfo.deviceWidth,
        height:deviceInfo.deviceWidth*0.1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'#666666',
         fontSize:14
    },
    line:{
        backgroundColor:'#999',
        width:deviceInfo.deviceWidth,
        height:0.5,
    }



});