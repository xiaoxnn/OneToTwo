import  {combineReducers} from 'redux'

import login from './../login'
import trainingMessage from './trainingMessage'
const  reducers=combineReducers({
    login,trainingMessage
});

export  default  reducers;