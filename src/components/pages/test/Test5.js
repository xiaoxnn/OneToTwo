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
import  RefreshListView,{RefreshState} from '../../common/RefreshListView'
export default class test5 extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            refreshState: RefreshState.Idle,
            dataSource:['1','2','3','4','5','6','5','6','5','6','5','6','5','6','5','6','5','6'],
            ResponderEnable:true,
        }
        this._previousLeft = 0;
        this._previousTop = 84;
        this._temp=0;
    }

    componentWillMount(){

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => this.state.ResponderEnable,
            onMoveShouldSetPanResponder: (evt, gestureState) => this.state.ResponderEnable,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this._circleStyles={
            style:{
                backgroundColor:'#fff',
                left: this._previousLeft,
                marginTop: this._previousTop,
            }
        }


    }

    _handlePanResponderGrant(e,gestureState){

    }
    _handlePanResponderMove(e,gestureState){
        console.log("test","_handlePanResponderMove"+gestureState.dy );
        let scroll_offset_Y=gestureState.dy;
        if(scroll_offset_Y<=-80){
            this.state.ResponderEnable=false
        }else{
            this.state.ResponderEnable=true
        }
        let scroll_Y =80+gestureState.dy;
        if(scroll_offset_Y>0){
            //下滑
            this.refs.view_content.setNativeProps({style: {marginTop:scroll_Y}})
        }else{
            //赏花
            this.refs.view_content.setNativeProps({style: {marginTop:scroll_Y}})
        }
    //   this._circleStyles.style.top = this._previousTop + gestureState.dy;
   /*    console.log("test","_handlePanResponderMove"+gestureState.dy +"    "+this._previousTop);
        if( this._previousTop>=0){
            this._previousTop=this._previousTop+gestureState.dy;
           // this._circleStyles.style.marginTop= this._previousTop;
             console.log("test","test"+ this._previousTop);
            this.refs.view.setNativeProps({style: {height: this._previousTop}})
        }*/
    }

    _handlePanResponderEnd(e,gestureState){

    }
    _handlePanResponderEnd(e,gestureState){

    }

    _onScroll(e){
        let newScrollOffset=e.nativeEvent.contentOffset.y;

        let scroll_Y =this._temp-newScrollOffset;
        console.log("test","_previousTop"+this._previousTop+"scroll_Y"+scroll_Y);
        if(scroll_Y>0&&this._previousTop>=0){
            this._temp=newScrollOffset
            this._previousTop=this._previousTop+scroll_Y;
            this._circleStyles.style.marginTop= this._previousTop;
            this.refs.view.setNativeProps({style: {height: this._previousTop,opacity:this._previousTop/84}})
        }else {
            this._temp=newScrollOffset
            this._previousTop=this._previousTop+scroll_Y;
            this._circleStyles.style.marginTop= this._previousTop;
            this.refs.view.setNativeProps({style: {height: this._previousTop,opacity:this._previousTop/84}})
        }

       /* if( this._previousTop>=0){

        }*/
    }

    _renderItem({item,index }){
        return (
            <View style={{height:40,justifyContent:'center',alignItems:'center',width:360}}>
                <Text>{item}</Text>
            </View>
        )
    }


    /**
     *头部刷新
     */
    onHeaderRefresh = () => {

    }

    /**
     *  脚部加载更多
     */
    onFooterRefresh = () => {

    }


    render() {
        return (
            <View style={styles.contain}>
                <View ref={'view'} style={{height:80,width:360,backgroundColor:'#f00',position:'absolute'}}/>
                <View  ref={'view_content'} style={{marginTop:80,width:360,backgroundColor:'#fff'}}    {...this._panResponder.panHandlers}>

                <RefreshListView
                    data={this.state.dataSource}
                    renderItem={this._renderItem.bind(this)}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    onScroll={this._onScroll.bind(this)}
                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                    headerRefreshEnable={false}   //禁止头部刷新false
                    footerRefreshEnable={false}   //禁止底部加载false
                    itemSeparator={10}           //条目间距

                />
            </View>
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
    }

});