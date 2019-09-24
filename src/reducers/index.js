import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import PlaceReducer from './PlaceReducer';

export default combineReducers({
    MainReducer, 
    PlaceReducer
});