import { combineReducers } from 'redux';
import formReducer from './form.reducer';
import alertReducer from './alert.reducer';

export default combineReducers({
    formReducer,
    alertReducer
});