import  {combineReducers} from 'redux'

import test from './test'
import homeTab from './homeTab'
const  RootReducers=combineReducers({
        test,homeTab
});
export  default  RootReducers;