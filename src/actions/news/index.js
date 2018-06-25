
import {createAction} from 'redux-actions'
import  actionType from '../../constants/actionType'
import  actions from '../../actionCreators/news'

const  news=createAction(actionType.News,actions.news)

const  actionCreators={
    news,
}


export  default  {actionCreators}