/**
 * Created by nigo on 2018/3/19.
 */
import React, { Component } from 'react';

import {
    AppRegistry,
    Text,
    View,
    Dimensions,
    StyleSheet,
    Platform,
    BackHandler,
    Animated,
    Easing
} from 'react-native';
import Picker from 'react-native-picker';
import {deviceInfo} from '../../utils'
import area from '../../asset/area.json';
import PropTypes from 'prop-types';
export default class SelectAddressOrDate extends Component<{}> {
    static propTypes = {
        cancel:PropTypes.string,             //取消按钮
        title:PropTypes.string,              //中间标题
        confirm:PropTypes.string,            //确认按钮
        callBackAddressValue:PropTypes.func, //地址回调方法
        callBackDateValue:PropTypes.func,    //时间回调方法
        pickerBg:PropTypes.array,            //背景颜色
        startYear:PropTypes.number,          //开始年份
        endYear:PropTypes.number,            //结束年份
        synchronousRefresh:PropTypes.bool,   //是否同步刷新
    }

    static defaultProps = {
        cancel:'取消',
        title:'请选择',
        confirm:'确认',
        pickerBg:[255,255,255,1],
        startYear:2010,
        endYear:2030,
        synchronousRefresh:false
    }

    constructor(props){
        super(props);
        this.state={
            xPosition: new Animated.Value(0),
            isShow:false,      //弹框是否显示
            selectedValue:[]   //选择的值  address: ['河北', '唐山', '古冶区']   date: ['2018年', '1月', '1日']
        }
    }

    componentWillMount(){
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount(){

        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        if(this.state.isShow){
            this.hide();
            return true;
        }
        return false
    };


    /**
     *  在外部调用 显示地址
     * @param pickedValue ['河北', '唐山', '古冶区']
     */
    showAddress(pickedValue){
        if(!this.state.isShow){
            this.state.selectedValue=pickedValue
            this._showAreaPicker()
            this.showAnimal()
            this.state.isShow=true
        }
    }


    /**
     *  在外部调用 显示地址
     * @param pickedValue ['2018年', '1月', '1日']
     */
    showDate(pickedValue){
        if(!this.state.isShow){
            this.state.selectedValue=pickedValue
            this._showDatePicker()
            this.showAnimal()
            this.state.isShow=true
        }
    }




    /**
     * 隐藏地址
     */
    hide(){
        if(this.state.isShow){
            Picker.hide()
            this.hideAnimal()
            this.state.isShow=false
        }
    }


    /**
     * 地址确认值
     * @param pickedValue  ['河北', '唐山', '古冶区']
     */
    confirmAddressValue(pickedValue){
        this.props.callBackAddressValue&&this.props.callBackAddressValue(pickedValue)
    }

    /**
     * 时间确认值
     * @param pickedValue  ['河北', '唐山', '古冶区']
     */
    confirmDateValue(pickedValue){
        this.props.callBackDateValue&&this.props.callBackDateValue(pickedValue)
    }

    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue:this.state.selectedValue,
            onPickerConfirm: pickedValue => {
                this.confirmAddressValue(pickedValue)
                this.hide()
            },
            onPickerCancel: pickedValue => {
                this.hide()
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                if(this.props.synchronousRefresh){
                    this.confirmAddressValue(pickedValue)
                }
            },
            pickerBg:this.props.pickerBg,
            pickerCancelBtnText:this.props.cancel,
            pickerConfirmBtnText:this.props.confirm,
            pickerTitleText:this.props.title,
            ...this.props
        });
        Picker.show();
    }


    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            selectedValue:this.state.selectedValue,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this.confirmDateValue(pickedValue)
                this.hide()
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                this.hide()
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                if(this.props.synchronousRefresh){
                    this.confirmDateValue(pickedValue)
                }
            },
            pickerBg:this.props.pickerBg,
            pickerCancelBtnText:this.props.cancel,
            pickerConfirmBtnText:this.props.confirm,
            pickerTitleText:this.props.title,
            ...this.props
        });
        Picker.show();
    }


    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }





    _createDateData() {
        let date = [];
        for(let i=this.props.startYear;i<this.props.endYear;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }




    showAnimal(){
        Animated.timing(
            this.state.xPosition,
            {
                toValue: 1,
                easing: Easing.linear,
                duration: 300,
            }
        ).start()
    }


    hideAnimal(){
        Animated.timing(
            this.state.xPosition,
            {
                toValue: 0,
                easing: Easing.linear,
                duration: 200,
            }
        ).start()
    }


    render(){
        return (
            <Animated.View
                style={[styles.contain,{transform: [{
                    translateY: this.state.xPosition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [ deviceInfo.deviceHeight , 0]
                    }),
                }]
                } ]}>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    contain:{
        width: deviceInfo.deviceWidth,
        height: deviceInfo.deviceHeight,
        position: 'absolute',
        opacity: 0.3,
        backgroundColor: "#666",
        left: 0,
        bottom: 0,
    },
});