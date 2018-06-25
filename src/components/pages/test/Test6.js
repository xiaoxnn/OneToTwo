import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Image,
    StyleSheet,
    Platform,
    View,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Dimensions,
    PanResponder
} from 'react-native';
import  Carousel from 'react-native-snap-carousel'
import {deviceInfo} from '../../../utils'
import   {Actions} from 'react-native-router-flux'
export default class test6 extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = {
            entries:['aaa','bbbb','cccc','dddd','ddd','ddd']
        }
    }

    componentWillMount(){



    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={{color:'#f00'}}>{ item }</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.contain}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={deviceInfo.deviceWidth*0.9}
                    itemWidth={deviceInfo.deviceWidth}
                    loop={true}
                    autoplay={true}
                />
                <TouchableOpacity onPress={()=>Actions.Test3()}>
                <Text style={{width:deviceInfo.deviceWidth,height:40,marginTop:30,backgroundColor:'#0ff'}}>jumpe</Text>
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
    },
    RefreshListView:{
        marginTop:80,
    },
    slide:{
        width:deviceInfo.deviceWidth*0.8,
        height:deviceInfo.deviceWidth*0.2,
        backgroundColor:'#ff0'
    }

});