import React, {Component} from "react"

import store from '../store/configureStore'
import {Provider, connect} from 'react-redux'
import {Scene, Router, Actions, Reducer, Drawer, Modal, Stack, Lightbox, Tabs} from "react-native-router-flux"
import {View, StyleSheet, BackHandler} from "react-native"
import Action from '../actions'
import Test1 from './pages/test/Test1'
import Test2 from './pages/test/Test2'
import launch from './pages/launch'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import loadingScene from './common/loadingScene'
import TabView from './pages/tab/TabView'
import TabView2 from './pages/tab/TabView2'
import TabView3 from './pages/tab/TabView3'
import TabView4 from './pages/tab/TabView4'
import MenuIcon from '../image/menu_burger.png'
import DrawerContent from './pages/drawer/DrawerContent'
import TabIcon from './common/TabIcon'
import  login from './pages/login'

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};
const getSceneStyle = () => ({
    backgroundColor: "white",
    shadowOpacity: 1,
    shadowRadius: 3,
})
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});


class App extends Component {
    render() {
        return (
                <Router
                    createReducer={reducerCreate}
                    tintColor='white'
                    getSceneStyle={getSceneStyle}
                >
                    <Scene key='root'>
                        <Modal key='Modal' hideNavBar
                               transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}  >

                            <Lightbox key='Lightbox'  hideNavBar>
                                <Stack key='Stack' hideNavBar   transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}>
                                    <Scene  key='launch'  component={launch}  />
                                    <Scene key='Test'    component={connect((state) => state.test, Action.dispatch('test'))(Test1)}  />
                                    <Scene key='Test2'   component={connect((state) => state.test, Action.dispatch('test'))(Test2)}  />
                                    <Scene key='login'   component={connect((state) => state.login, Action.dispatch('login'))(login)}  />
                                </Stack>
                                <Scene key="loadingScene" component={loadingScene}/>

                            </Lightbox>
                            <Drawer
                                hideNavBar
                                key="drawer"
                                contentComponent={DrawerContent}
                                drawerImage={MenuIcon}
                                drawerWidth={260}
                            >
                                <Scene hideNavBar panHandlers={null}>
                                    <Tabs
                                        key="tabbar"
                                        swipeEnabled
                                        showLabel={false}
                                        tabBarPosition='bottom'
                                        tabBarStyle={styles.tabBarStyle}
                                        // activeBackgroundColor="#06c1ae"
                                        // inactiveBackgroundColor="#979797"
                                    >
                                        <Scene key="tab_1_1" initial={true} component={TabView}   hideNavBar title="首页"   icon={TabIcon}   select={require('../image/tab_1_1.png')}normal={require('../image/tab_1_2.png')} />
                                        <Scene key="tab_2_1" component={TabView2}  title="新闻"     hideNavBar icon={TabIcon}   select={require('../image/tab_2_1.png')}normal={require('../image/tab_2_2.png')} />
                                        <Scene key="tab_3_1" component={TabView3}  title="视频"     hideNavBar  icon={TabIcon}    select={require('../image/tab_3_1.png')}normal={require('../image/tab_3_2.png')} />
                                        <Scene key="tab_4_1" component={TabView4}  title="我的"     hideNavBar icon={TabIcon}    select={require('../image/tab_4_1.png')}normal={require('../image/tab_4_2.png')} />
                                    </Tabs>
                                </Scene>
                            </Drawer>

                        </Modal>
                    </Scene>
                </Router>
        )
    }
}

const initApp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default initApp