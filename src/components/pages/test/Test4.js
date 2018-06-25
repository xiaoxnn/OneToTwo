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
    Dimensions
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;//360


type Props = {
    leftTitle?: string,            //左边标题
    leftTitleStyle?: Object,       //左边标题样式
    imageStyle?:Object,            //图片样式
    contentStyle?:Object,          //内容样式
}
export default class test4 extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            isOpen:false,
            height:0,
        }
    }
    props: Props
    static defaultProps = {
        leftTitle: "标题",
        titleHeight:deviceWidth*0.12,
        // value:-1,                                         //全部不选中
        // leftTitleStyle : commonStyles.Text_33_13,       //左边标题样式
        // leftEmptyTitleStyle: commonStyles.Text_33_13,   //左边空白文字样式
        // leftWidth :deviceWidth*0.28,                    //左边宽度
        // rightWidth:deviceWidth*0.68,                    //右边宽度
        // rightTitleStyle:commonStyles.Text_33_13,        //右边内容样式
        // style_h: deviceWidth*0.14,                      //组件高度
        // style_w: deviceWidth*0.96,                      //组件宽度
        // disabled:false,                                 //是否可以点击
        // rightJustifyContent:'flex-start',               //右边按钮的位置
    }
    componentWillMount(){
        if (Platform.OS == 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    startAnimation() {
        LayoutAnimation.spring()
        this.setState({ height: undefined,isOpen:true});
    }

    startAnimation2(){
        LayoutAnimation.spring()
        this.setState({ height: 0,isOpen:false});
    }

    render() {

        const {titleHeight,leftTitle}=this.props;

        return (
            <View style={styles.contain}>
                <TouchableOpacity  onPress={()=>this.state.isOpen?this.startAnimation2():this.startAnimation()}>
                    <View style={{width:deviceWidth,justifyContent:"space-between",height:titleHeight}}>
                        <Text style={[{color:'#999',fontSize:14}]}>{leftTitle}</Text>
                       {/* <Image source={require('../image/arrowdown_.png')}
                               style={[{ width:14,height:12},imageStyle]} resizeMode={'contain'} />*/}
                    </View>
                </TouchableOpacity>
                <View  style={[{width:deviceWidth,height:this.state.height}]}>
                    {this.props.children}
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

});