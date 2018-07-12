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

import  {deviceInfo,Orientation,TimeUtil} from '../../utils'
import Video from 'react-native-video'
import   {Actions} from 'react-native-router-flux'
let  url_="http://bd.abiechina.com/intrduceapp/vedio/play?filename=upload/videos/c5e7c87d787a4c0eac27b85fe74bb4a5.mp4"
export default class MoviePlayer extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            slideValue: 0.00,
            currentTime: 0.00,
            duration: 0.00,
            orientation:'',                 //PORTRAIT  垂直
            isLock:false,                  //是否锁屏
            isTouchedScreen:false,         //是否触摸
            closeTouched:false,            //触摸后关掉进度
            paused: false,                 //暂停播放
            loading:true,                  //正在加载中
            playError:false,               //播放错误
        }
    }

    componentWillMount() {
        const init = Orientation.getInitialOrientation()
        this.state.orientation=init
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        this.player.dismissFullscreenPlayer()
        this.timer && clearTimeout(this.timer)
    }
    onBackAndroid = () => {
        if(this.state.orientation !== 'PORTRAIT'){
            Orientation.lockToPortrait()
            this.setState({
                isLock:false,
                orientation: this.state.orientation === 'PORTRAIT'?'LANDSCAPE':'PORTRAIT'
            })
            return true
        }
        return false
    };

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
        this.setState({
            paused:true
        })
    }

    videoError(){
        this.setState({
            playError:true
        })
    }


    loadStart(e){

    }

    onLoad(e){
        this.player.presentFullscreenPlayer()
        this.setState({duration: e.duration})
    }

    back(){
        if(this.state.orientation !== 'PORTRAIT'){
            Orientation.lockToPortrait()
            this.setState({
                isLock:false,
                orientation: this.state.orientation === 'PORTRAIT'?'LANDSCAPE':'PORTRAIT'
            })
        }else{
            Actions.pop()
        }
    }

    progress(e){
        let sliderValue = parseInt(this.state.currentTime)
        this.setState({
            slideValue: sliderValue,
            currentTime: e.currentTime,
            loading: false,
            playError:false,
        })
        if(this.state.isTouchedScreen&&!this.state.closeTouched){
            this.state.closeTouched=true
            this.timer = setTimeout(()=> {
                this.state.isTouchedScreen=false
                this.state.closeTouched=false
            }, 6000);
        }
    }

    changeOrientation(){
        this.state.orientation === 'PORTRAIT'?Orientation.lockToLandscape():Orientation.lockToPortrait()
        this.setState({
            orientation: this.state.orientation === 'PORTRAIT'?'LANDSCAPE':'PORTRAIT'
        })
    }
    render() {
        const {orientation,isTouchedScreen,isLock,paused,loading,playError}=this.state
        const {url,title}=this.props
        return (
            <TouchableOpacity style={styles.contain}
                              disabled={isLock}
                              activeOpacity={1}
                              onPress={()=>this.setState({isTouchedScreen:!isTouchedScreen})}>
                <Video source={{uri: url}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onEnd={this.onEnd.bind(this)}                      // Callback when playback finishes
                       onError={this.videoError.bind(this)}               // Callback when video cannot be loaded
                       onLoadStart={this.loadStart.bind(this)}
                       onLoad={this.onLoad.bind(this)}
                       onProgress={this.progress.bind(this)}
                       paused={paused}
                       onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
                       onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
                       onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
                       onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
                       fullscreen={true}
                       style={this.state.orientation==='PORTRAIT'?styles.hbackgroundVideo:styles.backgroundVideo} />

                {
                    isTouchedScreen && !isLock && !playError && !loading ?
                        <View style={orientation==='PORTRAIT'?styles.hprogress:styles.progress }>
                            <TouchableOpacity onPress={()=>this.setState({paused:!paused})}>
                                <Image source={ paused?require('../../image/play.png'):require('../../image/pase.png')} style={styles.playImage}/>
                            </TouchableOpacity>
                            <Text style={styles.timeStyle}>{TimeUtil.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                            <Slider
                                style={styles.slider}
                                value={this.state.slideValue}
                                maximumValue={this.state.duration}
                                minimumTrackTintColor={'#fff'}
                                maximumTrackTintColor={'#666'}
                                thumbTintColor={'#fff'}
                                step={1}
                                onValueChange={value => this.setState({currentTime: value})}
                                onSlidingComplete={value => this.player.seek(value)}
                            />
                            <Text style={[styles.timeStyle,{marginLeft:0}]}>{TimeUtil.formatMediaTime(Math.floor(this.state.duration))}</Text>
                            <TouchableOpacity onPress={()=>this.changeOrientation()}>
                                <Image source={require('../../image/fullscreen.png')} style={[styles.image,{marginRight:10,marginLeft:10}]}/>
                            </TouchableOpacity>
                        </View>:<View style={orientation==='PORTRAIT'?{height:40}:{height:0}}/>
                }
                {
                    orientation!== 'PORTRAIT' ?
                        <TouchableOpacity
                            style={styles.lock}
                            onPress={() => this.setState({isLock: !isLock})}
                        >
                            <Image source={isLock ?require('../../image/lock.png'):require('../../image/unclok.png')} style={styles.image}/>
                        </TouchableOpacity> : null
                }
                {
                    isTouchedScreen && !isLock ?
                        <View style={orientation === 'PORTRAIT' ? styles.htopBar : styles.topBar}>
                            <TouchableOpacity onPress={() => this.back()}>
                                <Image
                                    source={isLock ? require('../../image/lock.png') : require('../../image/back.png')}
                                    style={styles.imageBack}/>
                            </TouchableOpacity>
                            <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        </View>:null

                }
                {loading?
                    <View style={styles.loading}>
                        <ActivityIndicator
                            animating={true}
                            style={[{height: 80}]}
                            color={'#06c1ae'}
                            size="large"
                        />
                    </View>:null
                }
                {playError?
                    <View  style={orientation === 'PORTRAIT' ?styles.hplayError:styles.playError}>
                        <View  style={styles.errorBg}>
                            <Text style={styles.title}>视频播放错误 !!!</Text>
                        </View>
                    </View>:null
                }
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex:1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    hbackgroundVideo:{
        width:deviceInfo.deviceWidth,
        height:deviceInfo.deviceWidth*0.5,
        backgroundColor:'#000'
    },
    progress:{
        flexDirection:'row',
        height:40,
        marginTop:deviceInfo.deviceWidth-40,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    hprogress:{
        flexDirection:'row',
        bottom:40,
        height:40,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    timeStyle: {
        color: '#fff',
        fontSize: 14,
        marginLeft:10
    },
    slider: {
        flex:1,
    },
    playImage:{
        width:24,
        height:24,
        marginLeft:10
    },
    image:{
        width:24,
        height:24
    },
    lock:{
        backgroundColor:'transparent',
        position:'absolute',
        left:0
    },
    topBar:{
        width:deviceInfo.deviceWidth,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        top:0,
        paddingLeft:10,
    },
    htopBar:{
        width:deviceInfo.deviceWidth-20,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        top:0,
        paddingLeft:10,
    },
    title:{
        fontSize:12,
        color:'#fff',
        marginLeft:10,
        marginRight:10,
    },
    imageBack:{
        width:20,
        height:20
    },
    loading:{
        position:'absolute',
        width:deviceInfo.deviceWidth,
        justifyContent:'center',
        alignItems:'center'
    },
    playError:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    hplayError:{
        width:deviceInfo.deviceWidth,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute'
    },
    errorBg:{
        height:40,
        padding:10,
        borderRadius:20,
        backgroundColor:'#000',
    },
});