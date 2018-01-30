import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducers  from './../reducers/RootReducers'
const createStoreWithMiddleware=applyMiddleware(thunkMiddleware)(createStore);

 function  configureStore(initialState) {
       const  store=createStoreWithMiddleware(RootReducers,initialState);
       return store;

}
export  default  store=new configureStore();