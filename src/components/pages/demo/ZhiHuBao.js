import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
} from 'react-native';
import  {deviceInfo} from '../../../utils'
import  ScrollableTab from '../../common/ScrollableTab'
export default class ZhiHuBao extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            dataType:['11','22','33','44','55','66','77'],
            itemHeight:[],
            stickyHeight:0,
            onMomentumScrollBegin:false,
        }

    }

    componentWillMount(){

    }



    changePosition(index){
        this.refs.ScrollableTab.changePosition(index)
    }

    callbackChangeIndex(index){
        this.state.onMomentumScrollBegin=true
        this.refs.ScrollView.scrollTo({x:0, y: this.state.itemHeight[index]-this.state.stickyHeight, animated: true})
    }


    _onScroll(e){
        if(!this.state.onMomentumScrollBegin){
            let newScrollOffset=e.nativeEvent.contentOffset.y+this.state.stickyHeight
            if(newScrollOffset>=this.state.itemHeight[0]&&newScrollOffset<this.state.itemHeight[1]){
                console.log("item 1")
                this.changePosition(0)
            }else  if(newScrollOffset>=this.state.itemHeight[1]&&newScrollOffset<this.state.itemHeight[2]){
                console.log("item 2")
                this.changePosition(1)
            }else if(newScrollOffset>=this.state.itemHeight[2]&&newScrollOffset<this.state.itemHeight[3]){
                console.log("item 3")
                this.changePosition(2)
            }else if(newScrollOffset>=this.state.itemHeight[3]&&newScrollOffset<this.state.itemHeight[4]){
                console.log("item 4")
                this.changePosition(3)
            }else if(newScrollOffset>=this.state.itemHeight[4]&&newScrollOffset<this.state.itemHeight[5]){
                console.log("item 5")
                this.changePosition(4)
            }else if(newScrollOffset>=this.state.itemHeight[5]&&newScrollOffset<this.state.itemHeight[6]){
                console.log("item 5")
                this.changePosition(5)
            }else if(newScrollOffset>=this.state.itemHeight[6]){
                console.log("item 5")
                this.changePosition(6)
            }
        }

    }


    _onLayout(e){
        console.log("_onLayout"+e.nativeEvent.layout.y)
        this.state.itemHeight.push(e.nativeEvent.layout.y)

    }
    _onLayout2(e){
         this.state.stickyHeight=e.nativeEvent.layout.height
    }

    _onScrollBeginDrag(){
        if( this.state.onMomentumScrollBegin==true){
            this.state.onMomentumScrollBegin=false
        }
    }

    render() {
        return (
            <ScrollView  ref={'ScrollView'} onScroll={this._onScroll.bind(this)} stickyHeaderIndices={[1]} onScrollBeginDrag={this._onScrollBeginDrag.bind(this)} >
                <View style={styles.head}>
                    <Text>这个是头部</Text>
                </View>
                <ScrollableTab titleArr={this.state.dataType} ref={'ScrollableTab'} onLayout={this._onLayout2.bind(this)}  callback={this.callbackChangeIndex.bind(this)}/>
                <View style={[styles.item,{height:100}]}   onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[0]}</Text></View>
                <View style={[styles.item,{height:140,backgroundColor:'#ddd'}]}   onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[1]}</Text></View>
                <View style={[styles.item,{height:60}]}    onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[2]}</Text></View>
                <View style={[styles.item,{height:100,backgroundColor:'#ddd'}]}   onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[3]}</Text></View>
                <View style={[styles.item,{height:100}]}   onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[4]}</Text></View>
                <View style={[styles.item,{height:120,backgroundColor:'#ddd'}]}   onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[5]}</Text></View>
                <View style={[styles.item,{height:deviceInfo.deviceHeight-40,backgroundColor:'#0ff'}]} onLayout={this._onLayout.bind(this)}><Text>{this.state.dataType[6]}</Text></View>
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
    head:{
        width:deviceInfo.deviceWidth,
        height:150,
        backgroundColor:'#0f0',
        justifyContent:'center',
        alignItems:'center'
    },
    stickyHeader:{
        width:deviceInfo.deviceWidth,
        height:40,
        backgroundColor:'#0ff'
    },
    item:{
        width:deviceInfo.deviceWidth,
        height:80,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },


});