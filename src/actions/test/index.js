
import {createAction} from 'redux-actions'
import  actionType from '../../constants/actionType'
import  actions from '../../actionCreators/test'

const  getText=createAction(actionType.Test,actions.addNum)

const  actionCreators={
     getText,
}


export  default  {actionCreators}