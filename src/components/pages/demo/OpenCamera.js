import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import  {deviceInfo} from '../../../utils'
import ImagePicker from 'react-native-image-crop-picker';

export default class OpenCamera extends Component<{}> {

    constructor(props){
        super(props)

    }

    open(){
        ImagePicker.openPicker({
            multiple:true
        }).then(image => {
            console.log(image);
        });
    }

    render() {
        return (
            <View style={styles.contain}>

                <TouchableOpacity onPress={()=>this.open()}>
                    <View style={styles.image}>
                        <Text>图库</Text>
                    </View>
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
    image:{
        width:deviceInfo.deviceWidth,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    }

});