/**
 * Created by guangqiang on 2017/10/9.
 */
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
    testSum: 20,
}

const actions = {}

actions[type.Test ] = (state, action) => {
    return {
        ...state,
        testSum: state.testSum+action.payload.data1,
    }
}

const reducer = handleActions(actions, initialState)

export default reducer