import  {combineReducers} from 'redux'

import test from './test'
import  login from './login'
const  RootReducers=combineReducers({
        test,login
});

export  default  RootReducers;