import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native';
import   {Actions} from 'react-native-router-flux'
import RefreshListView,{RefreshState}  from '../../common/RefreshListView'
import NewsItem from './NewsItem'
export default class TabView extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            refreshState:RefreshState.Idle
        };

    }
    componentDidMount() {
        this.props.news({type:'',key:'62e38bd6b53d386a799a05e8d3c49b56'})
    }

    _renderItem({item,index }){
        return(
            <NewsItem  data={item}/>
        )
    }
    
    render() {
        let data=this.props.data;
        return (
            <View style={styles.contain}>
                <TouchableOpacity onPress={()=>Actions.drawerOpen()}>
                    <Text style={{marginTop:30}}>Open Drawer</Text>
                </TouchableOpacity>

                <RefreshListView
                    data={data}
                    renderItem={this._renderItem.bind(this)}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                    headerRefreshEnable={true}   //禁止头部刷新false
                    footerRefreshEnable={true}   //禁止底部加载false
                    itemSeparator={10}           //条目间距
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent:'center'
    },

});