
import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    WebView

} from 'react-native';

import  deviceInfo from '../../utils/deviceInfo'
export default class index extends Component<{}> {

    componentDidMount() {

    }
    render() {
        const {url} =this.props
        return (
            <View style={styles.contain}>
                <WebView     style={{flex:1}}
                             source={{uri:url}}
                             scalesPageToFit={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
      flex:1
    },
});