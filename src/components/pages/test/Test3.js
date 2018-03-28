import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import  {deviceInfo} from '../../../utils/index'
import * as Animatable from 'react-native-animatable';
const MONEY_DIMENSIONS = { width: 49, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;
const FlippingImage = ({ back = false, delay, duration = 1000, source, style = {} }) => (
    <Animatable.Image
        animation={{
            from: { rotateX: back ? '0deg' : '180deg', rotate: !back ? '180deg' : '0deg' },
            to: { rotateX: back ? '360deg' : '-180deg', rotate: !back ? '180deg' : '0deg' },
        }}
        duration={duration}
        delay={delay}
        easing="linear"
        useNativeDriver
        source={source}
        style={{
            ...style,
            backfaceVisibility: 'hidden',

        }}
    />
);

const Falling = ({ duration, delay, style, children }) => (
    <Animatable.View
        // animation={{
        //     from: { translateY: -100},
        //     to: { translateY: 200},
        // }}
        // duration={duration}
        // delay={delay}
        easing="linear"

        style={{position: 'absolute',
            paddingHorizontal: WIGGLE_ROOM,
          top:-200}}
    >
        {children}
    </Animatable.View>
);

const randomize = max => Math.random() * max;
export default class test3 extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            visiable:false,
        }
    }

    componentWillMount(){
       // this.refs.view.zoomOut(0.1)
    }
    componentDidMount() {
   //  this.refs.view.zoomOut(0.1)
    }

    change(){
        this.refs.view.bounceInDown(2000)
    }

    render() {
        return (
            <View style={styles.contain}>
                <View style={{height:deviceInfo.deviceWidth*0.1,width:deviceInfo.deviceWidth,justifyContent:'center',alignItems:'center',backgroundColor:'#DDD'}}>
                    <Text>动画</Text>
                </View>



                <Falling
                    duration={1000}
                    delay={2000}
                >
                    <View>
                        <Text>显示动画</Text>
                    </View>
                </Falling>


                <TouchableOpacity onPress={()=>  this.refs.view.transitionTo({ top: 0 })}>
                <View>
                    <Text>显示动画</Text>
                </View>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => this.refs.view.transitionTo({ top: -deviceInfo.deviceHeight })}>
                <Animatable.View    ref="view" style={{top: -deviceInfo.deviceHeight,backgroundColor:'transparent',width:deviceInfo.deviceWidth,height:deviceInfo.deviceHeight,justifyContent:'center',alignItems:'center',position:'absolute'}}>

                        <Text>Bounce me!</Text>

                </Animatable.View>
                </TouchableWithoutFeedback>
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

});