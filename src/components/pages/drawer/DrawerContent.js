import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';



export default class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={()=>Actions.drawerClose()}>
          <Text>关闭Drawer</Text>
          </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
});


