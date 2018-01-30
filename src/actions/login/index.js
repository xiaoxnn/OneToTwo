
import {createAction} from 'redux-actions'
import  actionType from '../../constants/actionType'
import  actions from '../../actionCreators/login'

const  LOGIN=createAction(actionType.Login,actions.userInfo)

const  actionCreators={
    LOGIN,
}


export  default  {actionCreators}