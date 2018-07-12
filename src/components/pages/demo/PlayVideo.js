import React, {Component} from 'react';
import {
    ActivityIndicator,
    Text,
    Image,
    StyleSheet,
    Slider,
    View,
    TouchableOpacity,
    Platform,
    BackHandler
} from 'react-native';

import  {deviceInfo,Orientation} from '../../../utils'
import Video from 'react-native-video'
import   {Actions} from 'react-native-router-flux'
let  url_="http://bd.abiechina.com/intrduceapp/vedio/play?filename=upload/videos/c5e7c87d787a4c0eac27b85fe74bb4a5.mp4"
import {TimeUtil} from '../../../utils'
export default class PlayVideo extends Component<{}> {

    constructor(props){
        super(props)
        this.state={

        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.contain}>
                <TouchableOpacity onPress={()=>Actions.push('MoviePlayer',{url:url_})}>
                  <Text>播放视频</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex:1,
        justifyContent: 'center',
    },

});