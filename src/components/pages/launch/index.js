
import React, {Component} from 'react';
import {
   Image,
    View,
    StyleSheet,
    Dimensions,

} from 'react-native';
import   {Actions} from 'react-native-router-flux'
var deviceHeight = Dimensions.get('window').height;//640
var deviceWidth = Dimensions.get('window').width;//360
export default class test1 extends Component<{}> {

    componentDidMount() {
        this.fristTime= setTimeout(() => {
            Actions.tab_4_1();
        }, 2000)
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        this.fristTime && clearTimeout( this.fristTime);
    }
    render() {
        return (
            <View style={styles.contain}>
               <Image source={require('../../../image/launch.jpg')} style={{width:deviceWidth,height:deviceHeight}} resizeMode={'cover'}  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
       flex:1,
    },
});