import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducers  from './../reducers/RootReducers'


const middlewares = [
    thunkMiddleware,
    promiseMiddleware({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}),

]

const createStoreWithMiddleware=applyMiddleware(...middlewares)(createStore);

 function  configureStore(initialState) {
       const  store=createStoreWithMiddleware(RootReducers,initialState);
       return store;

}


export  default  store=new configureStore();