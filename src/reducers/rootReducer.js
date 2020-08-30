import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const appReducer = combineReducers({
    userReducer,
    chatReducer
 });

 export default appReducer;