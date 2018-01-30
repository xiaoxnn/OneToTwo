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

export default class test1 extends Component<{}> {

    componentDidMount() {
        console.log("test","componentDidMount")

    }

    render() {
        let num=this.props.testSum;
        return (
            <View style={styles.contain}>
                <TouchableOpacity onPress={()=>   this.props.getText()}>
                   <Text>这是第一个页面{num}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.login() }>
                <Text >跳转到第二个页面</Text>
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