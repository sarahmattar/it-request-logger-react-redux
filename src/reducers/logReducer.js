import {
	ADD_LOG,
	GET_LOGS,
	DELETE_LOG,
	SET_LOADING,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOG,
	LOGS_ERROR,
	SEARCH_LOGS,
} from '../actions/types';

//define the initial state in an object
const initialState = {
	logs: null,
	current: null,
	loading: false,
	error: null,
};

//this is extremely similar to Context reducers
export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_LOG:
			return {
				...state,
				logs: [...state.logs, action.payload],
				loading: false,
			};
		case GET_LOGS:
			return {
				...state,
				logs: action.payload,
				loading: false,
			};
		case SEARCH_LOGS:
			return {
				...state,
				logs: action.payload,
			};
		case DELETE_LOG:
			return {
				...state,
				logs: state.logs.filter((log) => log.id !== action.payload),
				loading: false,
			};
		case UPDATE_LOG:
			return {
				...state,
				logs: state.logs.map((log) =>
					log.id === action.payload.id ? action.payload : log
				),
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case LOGS_ERROR:
			console.error(action.payload);
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
