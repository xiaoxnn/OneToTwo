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

export default class TabView3 extends Component<{}> {

    componentDidMount() {

    }

    render() {
        let num=this.props.testSum;
        return (
            <View style={styles.contain}>

                <TouchableOpacity onPress={()=>Actions.Test2()}>
                    <Text >我的</Text>
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