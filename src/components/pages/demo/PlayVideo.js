import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    ScrollView,
    StyleSheet,

    View,
    TouchableOpacity,
} from 'react-native';

import  {deviceInfo,Orientation} from '../../../utils'
import Video from 'react-native-video'
let url="http://bd.abiechina.com/upload/videos/c5e7c87d787a4c0eac27b85fe74bb4a5.mp4"
export default class TabView4 extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
           isload:"aaaa"
        }
    }

    componentDidMount() {

    }

    fullScreenPlayerWillPresent(){

    }

    fullScreenPlayerDidPresent(){

    }
    fullScreenPlayerWillDismiss(){

    }
    fullScreenPlayerDidDismiss(){

    }
    onBuffer(){

    }

    onEnd(){

    }

    videoError(){

    }

    loadStart(e){

       if(e.isNetwork){
           this.setState({
               isload:e.uri,
           })
       }else{
           this.setState({
               isload:e.uri,
           })
       }
    }

    changeOrientation(){
       /* this.state.orientation === 'PORTRAIT'?Orientation.lockToLandscape():Orientation.lockToPortrait()

        this.setState({
            orientation: this.state.orientation === 'PORTRAIT'?'LANDSCAPE':'PORTRAIT'
        })*/
    }
    render() {
        return (
            <ScrollView >
            <View style={styles.contain}>
                <View style={{width:deviceInfo.deviceWidth,height:deviceInfo.deviceHeight*0.6}}>
                    <Video source={{uri: url}}   // Can be a URL or a local file.
                           ref={(ref) => {
                               this.player = ref
                           }}                                      // Store reference
                           onBuffer={this.onBuffer}                // Callback when remote video is buffering
                           onEnd={this.onEnd}                      // Callback when playback finishes
                           onError={this.videoError}               // Callback when video cannot be loaded
                           onLoadStart={this.loadStart.bind(this)}
                           onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
                           onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
                           onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
                           onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
                           poster={'https://baconmockup.com/300/200/'}
                           posterResizeMode={'cover'}
                           style={styles.backgroundVideo} />
                </View>
                    <View>
                    <TouchableOpacity onPress={()=>this.player.presentFullscreenPlayer()}>
                      <Text>全屏{this.state.isload}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.player.dismissFullscreenPlayer()}>
                        <Text>小屏</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:deviceInfo.deviceWidth,height:deviceInfo.deviceHeight}}/>

            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',

    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }

});