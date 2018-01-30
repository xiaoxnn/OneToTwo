import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    Image
} from 'react-native';

const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
    // select: PropTypes.string,
    // normal: PropTypes.string,
};

class TabIcon extends Component<{}> {

    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={this.props.focused ?this.props.select:this.props.normal} style={{width:20,height:20,}} resizeMode={'cover'}  />
                <Text  style={{color: this.props.focused ? '#06c1ae' : 'black',fontSize:14}}>
                    {this.props.title}
                </Text>
            </View>
        )
    }

}

// const TabIcon = (props) => {
//   return
// };

TabIcon.propTypes = propTypes;

export default TabIcon;
