/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text,Image, TouchableOpacity, Slider, ActivityIndicator, Modal, Platform,Dimensions,StyleSheet,StatusBar,BackHandler,ToastAndroid} from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import {formatMediaTime} from '../../../util/CommonUtils'
var deviceHeight = Dimensions.get('window').height;//640
var deviceWidth = Dimensions.get('window').width;//360
const playerHeight = deviceWidth*0.6
export default class MoviePlayer extends Component {

  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      rate: 1,
      slideValue: 0.00,
      currentTime: 0.00,
      duration: 0.00,
      paused: false,
      isTouchedScreen: true,
      modalVisible: true,
      isLock: false,
      orientation: '',
      specificOrientation: '',
      closeTouched:false,
    }
  }

  componentWillMount() {
    const init = Orientation.getInitialOrientation()
    console.log("test  "+init);
 /*   if(init=='PORTRAIT'){
       this.state.orientation='LANDSCAPE'
        this.state.specificOrientation='LANDSCAPE'
        Orientation.lockToLandscape();
    }*/
     this.setState({
      init,
       orientation: init,
      specificOrientation: init,
    })
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._updateOrientation)
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation)
      if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
      }
  }

  componentWillUnmount() {
      Orientation.lockToPortrait()
    Orientation.removeOrientationListener(this._updateOrientation)
    Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation)
      if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
      }
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

  _updateOrientation(orientation){

      this.setState({ orientation:orientation })
  }
  _updateSpecificOrientation(specificOrientation){

      this.setState({ specificOrientation:specificOrientation })
  }

  loadStart(data) {
    console.log('loadStart', data)
  }

  setDuration(duration) {
    this.setState({duration: duration.duration})
  }

  setTime(data) {
    let sliderValue = parseInt(this.state.currentTime)
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime,
      modalVisible: false
    })

    if(this.state.isTouchedScreen&&!this.state.closeTouched){
        this.state.closeTouched=true
        this.timer = setTimeout(()=> {
            this.state.isTouchedScreen=false
            this.state.closeTouched=false
        }, 6000);

    }
  }

  onEnd(data) {
    this.player.seek(0)
  }

  videoError(error) {
    this.showMessageBar('播放器报错啦！')(error.error.domain)('error')
    this.setState({
      modalVisible: false
    })
  }

  onBuffer(data) {
    console.log('onBuffer', data)
  }

  onTimedMetadata(data) {
    console.log('onTimedMetadata', data)
  }

  showMessageBar = title => msg => type => {
      ToastAndroid.showWithGravity(msg,ToastAndroid.SHORT,ToastAndroid.CENTER);
  }

  play() {
    this.setState({
      paused: !this.state.paused,
    })
  }


  goback(){
     //  Orientation.lockToPortrait();
     // this.props.navigation.pop();
    //  this.props.navigator.pop()


     if(this.state.orientation === 'PORTRAIT'){
         this.props.navigation.goBack()
     }else{
         Orientation.lockToPortrait()
         this.setState({
             orientation: this.state.orientation === 'PORTRAIT'?'LANDSCAPE':'PORTRAIT'
         })
     }
  }

  changeOrientation(){
      this.state.orientation === 'PORTRAIT'?Orientation.lockToLandscape():Orientation.lockToPortrait()

      this.setState({
            orientation: this.state.orientation === 'PORTRAIT'?'LANDSCAPE':'PORTRAIT'
      })
  }

    renderModal2(){

       if(this.state.modalVisible){
           return (
               <View style={[styles.indicator,{position:'absolute'}]}>
                 <ActivityIndicator
                     animating={true}
                     style={[{height: 80}]}
                     color={'#06c1ae'}
                     size="large"
                 />
               </View>
           )
       }
        return (
          null
        )
    }

  renderModal() {
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() =>
            this.setState({
            modalVisible: false
        })}
      >
        <View style={styles.indicator}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            color={'#06c1ae'}
            size="large"
          />
        </View>
      </Modal>
    )
  }

  render() {
    const {orientation, isLock} = this.state
    const url  =  this.props.url
    const title=this.props.title==undefined?"":this.props.title
    return (
      <TouchableOpacity
          disabled={this.state.isLock}
          activeOpacity={0.7}
          style={[styles.movieContainer, {height: orientation === 'PORTRAIT' ? deviceHeight :deviceWidth,
          marginTop: orientation === 'PORTRAIT' ? Platform.OS === 'ios' ? 20 : 0 : 0}]}
        onPress={() => this.setState({isTouchedScreen: !this.state.isTouchedScreen})}>
        <Video source={{uri: url}}
               ref={ref => this.player = ref}
               rate={this.state.rate}
               volume={1.0}
               muted={false}
               paused={this.state.paused}
               resizeMode="cover"
               repeat={true}
               playInBackground={false}
               playWhenInactive={false}
               ignoreSilentSwitch={"ignore"}
               progressUpdateInterval={250.0}
               onLoadStart={(data) => this.loadStart(data)}
               onLoad={data => this.setDuration(data)}
               onProgress={(data) => this.setTime(data)}
               onEnd={(data) => this.onEnd(data)}
               onError={(data) => this.videoError(data)}
               onBuffer={(data) => this.onBuffer(data)}
               onTimedMetadata={(data) => this.onTimedMetadata(data)}
               style={this.state.orientation === 'PORTRAIT'?styles.verticalVideoPlayer:styles.videoPlayer}
        />
          {  this.state.isTouchedScreen && !isLock ?
            <View style={ this.state.orientation === 'PORTRAIT'?styles.verticalNavContentStyle:styles.navContentStyle}>
              <View style={{flexDirection: 'row', alignItems:'center', flex: 1}}>
                <TouchableOpacity
                    disabled={this.state.isLock}
                  style={{backgroundColor:  'transparent'}}
                     onPress={()=>this.goback()}>
                  <Image source={require('./../../../img/back.png')}
                         style={styles.backiamge}/>
                </TouchableOpacity>
                <Text style={{color:'#fff', marginLeft: 10}}>{title}</Text>
              </View>
            </View>:
              <View style={{height:44,position:"absolute"}}/>
          }
        {
         orientation!== 'PORTRAIT' ?
            <TouchableOpacity
              style={{marginHorizontal: 10, backgroundColor:'transparent', width: 30, height: 30, position:'absolute',left:0}}
              onPress={() => this.setState({isLock: !this.state.isLock})}
            >
              <Image source={ this.state.isLock ?require('./../../../img/lock.png'):require('./../../../img/unclok.png')}
                     style={styles.lockimag}/>
             </TouchableOpacity> : null
        }
        {
          this.state.isTouchedScreen && !isLock ?
            <View style={ this.state.orientation === 'PORTRAIT'?styles.toolBarStyle:styles.verticalToolBarStyle}>
              <TouchableOpacity onPress={() => this.play()}>
                <Image source={this.state.paused?require('./../../../img/start_play.png'):require('./../../../img/stop_play.png')}
                       style={styles.image} />
              </TouchableOpacity>
              <View style={styles.progressStyle}>
                <Text style={styles.timeStyle}>{formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                <Slider
                  style={styles.slider}
                  value={this.state.slideValue}
                  maximumValue={this.state.duration}
                  minimumTrackTintColor={'#666'}
                  maximumTrackTintColor={'#FFF'}
                  thumbTintColor={'#fff'}
                  thumbImage={require('../../image/play_pause.png')}
                  step={1}
                  onValueChange={value => this.setState({currentTime: value})}
                  onSlidingComplete={value => this.player.seek(value)}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#fff', fontSize: 12}}>{formatMediaTime(Math.floor(this.state.duration))}</Text>
                </View>
              </View>
              {
                orientation === 'PORTRAIT' ?
                  <TouchableOpacity onPress={()=>this.changeOrientation()}>
                    <Image source={require('./../../../img/pull_big.png')}
                           style={styles.image}/>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={()=>this.changeOrientation()}>
                    <Image source={require('./../../../img/pull_small.png')}
                           style={styles.image}/>
                  </TouchableOpacity>
              }
            </View> :null
        }
         {this.renderModal2()}
          {<StatusBar  hidden={ this.state.orientation === 'PORTRAIT'?true:true} />
          }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  movieContainer: {
      justifyContent:'center',
      backgroundColor:'#000'
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
    verticalVideoPlayer:{
       width:deviceWidth,
       height:deviceWidth*0.6
    },
  navContentStyle: {
    height: 44,
    paddingHorizontal: 10,
    position:'absolute',
    top:0
  },
    verticalNavContentStyle: {
        height: 44,
        paddingHorizontal: 10,
        position:'absolute',
        top:0
    },
  toolBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    marginTop: -30,
    height: 30,
  },
  verticalToolBarStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      justifyContent: 'space-around',
      alignItems:'flex-end',
      height:deviceWidth,
      paddingBottom:10
  },
  timeStyle: {
    color: '#fff',
    fontSize: 12
  },
  slider: {
    flex: 1,

  },
  progressStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10
  },
  indicator: {
    height: deviceWidth,
    width: deviceHeight,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navToolBar: {
    backgroundColor: 'transparent',
    marginHorizontal: 5
  },
    lockimag:{
        width:26,
        height:26,
    },
    image:{
       width:15,
        height:15,
    },
    backiamge:{
        width:7,
        height:15,
    }
    ,clear:{
        backgroundColor:'transparent'
    }
})