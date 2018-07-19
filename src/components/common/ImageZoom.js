/**
 * Created by justin on 2018/3/19.
 */
import React, { Component } from 'react';

import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Modal,
    Image
} from 'react-native';
import {deviceInfo} from '../../utils'
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
export default class ImageZoom extends Component<{}> {
    static propTypes = {
        zoomImageIndex:PropTypes.number,
        imageUrls:PropTypes.array.isRequired,
        isShowRight:PropTypes.bool,
        topBarRightImage:PropTypes.object,
        topBarRightImageStyle:PropTypes.object,
        topBarRightCallBack:PropTypes.func,
    }

    static defaultProps = {
        zoomImageIndex:0,
        isShowRight:false,
        topBarRightImage:require('../../image/delete.png')
    }

    constructor(props){
        super(props);
        this.state={
            modalVisible: false,      //弹框是否显示
            imageUrls:this.props.imageUrls,
            zoomImageIndex:this.props.zoomImageIndex,
        }
    }


    componentWillReceiveProps(nextProps){
          this.setState({
              imageUrls:nextProps.imageUrls,
              zoomImageIndex:nextProps.zoomImageIndex
          })
    }


    /**
     * 外部调用显示图片缩放
     */
    show(index) {
        this.state.zoomImageIndex=index
        this._setModalVisible(true)
    }



    /**
     * 隐藏图片缩放
     */
    hide(){
        this._setModalVisible(false)
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    /**
     *顶部标题栏
     * @param currentIndex
     * @param allSize
     * @returns {XML}
     */
    renderIndicator(currentIndex,allSize){
        return <View style={styles.zoom}>
            <View style={{height:50,alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>this._setModalVisible(false)}>
                    <Image source={require('../../image/back.png')} style={styles.back}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.topBarT}>{currentIndex}/{allSize}</Text>
            </View>
            {this.props.isShowRight?
                <TouchableOpacity onPress={()=>this.props.topBarRightCallBack&&this.props.topBarRightCallBack(currentIndex,allSize)}>
                    <Image source={this.props.topBarRightImage} style={[styles.topBarRight,this.props.topBarRightImageStyle]}/>
                </TouchableOpacity>:null
            }
        </View>
    }

    /**
     * 正在加载中
     * @returns {XML}
     */
    loadingRender(){
        return <View style={styles.loading}>
            <Image source={require('../../image/loading.gif')} style={{width:30,height: 30}}/>
        </View>
    }



    render(){
        const {zoomImageIndex,imageUrls}=this.state
        return (
            <Modal  style={styles.contain}  visible={this.state.modalVisible} transparent={true}  onRequestClose={() => {this._setModalVisible(false)}}>
                <ImageViewer  saveToLocalByLongPress={false} imageUrls={imageUrls}  renderIndicator={this.renderIndicator.bind(this)}  index={zoomImageIndex}  loadingRender={this.loadingRender}/>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    contain:{
        width: deviceInfo.deviceWidth,
        height: deviceInfo.deviceHeight,
        backgroundColor: "#666",
    },
    zoom:{
        width:deviceInfo.deviceWidth,
        height:50,
        backgroundColor:'transparent',
        position:'absolute',
        zIndex:1001,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    topBarRight:{
        width: 16,
        height: 16,
        marginLeft:20,
        marginRight:20
    },
    topBarT:{
        marginLeft:20,
        color:'#fff',
        fontSize:14
    },
    back:{
        width: 9,
        height: 16,
        marginLeft:20
    },
    loading:{
        width:deviceInfo.deviceWidth,
        height:deviceInfo.deviceHeight,
        justifyContent:'center',
        alignItems:'center'
    }

});