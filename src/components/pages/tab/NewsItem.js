import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    FlatList,
    StyleSheet,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import   {Actions} from 'react-native-router-flux'

import deviceInfo from '../../../utils/deviceInfo'
export default class NewsItem extends Component<{}> {

    componentDidMount() {

    }
    render() {
         const {data}=this.props
         return (
             <TouchableOpacity  onPress={()=> Actions.push('WebView',{url:data.url,title:data.category})}>
                <View style={styles.contain}>

                    <Image  source={ {uri:data.thumbnail_pic_s}}  style={styles.image} resizeMode={'contain'} />
                    <View>
                        <Text>{data.title}</Text>
                        <Text>作者: {data.author_name}</Text>
                        <Text>时间: {data.date}</Text>
                    </View>
                </View>
             </TouchableOpacity>
         )
    }
}

const styles = StyleSheet.create({
    contain: {
        backgroundColor:'#f4f4f4',
        alignItems: 'center',
        flexDirection:'row',
        width:deviceInfo.deviceWidth,
        height:deviceInfo.deviceWidth*0.3
    },
    image:{
        width:deviceInfo.deviceWidth*0.3,
        height:deviceInfo.deviceWidth*0.3,
    }
});