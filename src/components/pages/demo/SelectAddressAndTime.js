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
import  SelectAddressOrDate  from '../../common/SelectAddressOrDate'
import  {deviceInfo} from '../../../utils'
import  PropTypes from 'prop-types'
export default class TabView4 extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            address:[],
            time:[],
        }
    }

    componentDidMount() {

    }

    open(){
      this.refs.SelectAddressOrDate.showAddress(this.state.address)
    }


    openTime(){
        this.refs.SelectAddressOrDate.showDate(this.state.time)
    }

    callBackDateValue(value){
        this.setState({
            time:value
        })
    }

    callBackAddressValue(value){
        this.setState({
            address:value
        })
    }

    render() {
        return (
            <View style={styles.contain}>

                <View style={styles.select}>
                    <TouchableOpacity onPress={()=>this.open()}>
                        <Text>{this.state.address[0]}{this.state.address[1]}{this.state.address[2]}</Text>
                        <Text>打开地址</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.select}>
                    <TouchableOpacity onPress={()=>this.openTime()}>
                    <Text>{this.state.time[0]}{this.state.time[1]}{this.state.time[2]}</Text>
                   <Text>选择时间</Text>
                 </TouchableOpacity>
                </View>
                <SelectAddressOrDate     ref={'SelectAddressOrDate'}  callBackAddressValue={this.callBackAddressValue.bind(this)} callBackDateValue={this.callBackDateValue.bind(this)}/>
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
    select:{
        width:deviceInfo.deviceWidth,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    }


});