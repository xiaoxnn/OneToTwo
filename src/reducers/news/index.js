/**
 * Created by guangqiang on 2017/10/9.
 */

import actionType from '../../constants/actionType'

import {handleActions} from 'redux-actions'

const initialState = {
    data: {},
}

const actions = {}

actions[actionType.News+actionType.FETCH_SUCCESS_SUFFIX ] = (state, action) => {
    return {
        ...state,
        data:action.payload.result.data,
    }
}

const reducer = handleActions(actions, initialState)

export default reducer