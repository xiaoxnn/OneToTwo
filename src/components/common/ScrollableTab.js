import React, {Component} from 'react';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';


export default class ScrollableTab extends Component<{}> {

    static propTypes = {
        titleArr:PropTypes.array,
    }

    static defaultProps = {
    }

    constructor(props){
        super(props)
        this.state={
            titleArr:this.props.titleArr,
            position:0
        }
    }

    clickChange(index){
        if(index!=this.state.position){
            this.props.callback&&this.props.callback(index)
            this.changePosition(index)
        }
    }

    changePosition(index){
        if(index!=this.state.position){
            this.refs.ScrollView.scrollTo({x: index * 70, y: 0, animated: false})
            this.setState({
                position:index
            })
        }

    }

    render() {
        let tempView=[];
         const {titleArr,position}=this.state;
        for(let i=0;i<titleArr.length;i++){
            tempView.push(
                <TouchableOpacity  onPress={()=>this.clickChange(i)} key={i}>
                    <View style={position==i?styles.item:styles.unItem} >
                        <Text style={position==i?{color:'#0f0'}:{color:'#333'}}>{titleArr[i]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <ScrollView ref={'ScrollView'} horizontal={true}showsHorizontalScrollIndicator={false} style={{backgroundColor:'#999'}}>
                {tempView}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
     item:{
         height:40,
         width:70,
         justifyContent:'center',
         alignItems:'center',
     },
    unItem:{
        width:70,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },


});


