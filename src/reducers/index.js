import { combineReducers } from 'redux';
import logReducer from './logReducer';
import techReducer from './techReducer';

//individual reducer files are imported here and added to the object below.

export default combineReducers({
	log: logReducer,
	tech: techReducer,
});
