
import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,

} from 'react-native';

import  deviceInfo from '../../utils/deviceInfo'
export default class loadingScene extends Component<{}> {

    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.contain}>
                <View style={{width:50,height:50}}>
                    <ActivityIndicator
                        size="large"
                        color="#ee5412"
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contain: {
        width: deviceInfo.deviceWidth,
        height: deviceInfo.deviceHeight,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
    },
});