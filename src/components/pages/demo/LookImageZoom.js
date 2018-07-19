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
import  ImageZoom from '../../common/ImageZoom'
export default class LookImageZoom extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
           image:[{url:'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=55f57896a1345982da8ae3923cf5310b/9358d109b3de9c821370156d6081800a19d8433f.jpg'},
               { url:'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=245caeebb40e7bec3cda05e11f2fb9fa/960a304e251f95cacc952852c5177f3e660952f5.jpg'},
               { url:'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}],
            zoomImageIndex:1,
        }
    }

    /**
     *显示缩放图片
     * @param index
     */
    showImage(index){
       this.refs.ImageZoom.show(index)
    }

    /**
     * 删除图片
     * @param currentIndex
     * @param allSize
     */
    deleteImage(currentIndex,allSize){
        this.state.image.splice(currentIndex-1,1)
        if(this.state.image.length==0){
            this.refs.ImageZoom.hide()
        }
        this.setState({
            image:this.state.image,
            zoomImageIndex:0,
        })
    }

    render() {
        let imagesView=[];
        for(let i=0;i<this.state.image.length;i++){
            imagesView.push(
                <TouchableOpacity onPress={()=>this.showImage(i)} key={i}>
                <Image  source={ {uri:this.state.image[i].url}}  style={styles.image} resizeMode={'cover'} />
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.contain}>
                <View style={styles.zoomImage}>
                    {imagesView}
                </View>
                <ImageZoom  ref={'ImageZoom'} imageUrls={this.state.image} isShowRight={true} topBarRightCallBack={this.deleteImage.bind(this)} zoomImageIndex={this.state.zoomImageIndex} />
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
    zoomImage:{
        width:deviceInfo.deviceWidth,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    image:{
        width:deviceInfo.deviceWidth*0.5,
        height:deviceInfo.deviceWidth*0.25
    }
});