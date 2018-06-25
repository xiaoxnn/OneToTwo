import  {combineReducers} from 'redux'

import test from './test'
import homeTab from './homeTab'
import news from  './news'
const  RootReducers=combineReducers({
        test,homeTab,news
});
export  default  RootReducers;