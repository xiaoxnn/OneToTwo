/**
 * Created by guangqiang on 2017/10/9.
 */

import actionType from '../../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
    userinfo: {},
}

const actions = {}

actions[actionType.TRAINING_MESSAGE+actionType.FETCH_SUCCESS_SUFFIX ] = (state, action) => {
    return {
        ...state,
        userinfo:action.payload,
    }
}

const reducer = handleActions(actions, initialState)

export default reducer