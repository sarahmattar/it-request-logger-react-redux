import {
	ADD_LOG,
	GET_LOGS,
	DELETE_LOG,
	SET_LOADING,
	LOGS_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOG,
	SEARCH_LOGS,
} from './types';

//we use thunks to make asynchronous calls from actions to reducers

//add a new log
export const addNewLog = (log) => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch('/logs', {
			method: 'POST',
			body: JSON.stringify(log),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		dispatch({ type: ADD_LOG, payload: data });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.statusText });
	}
};

//get the existing list of logs
export const getLogs = () => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch('/logs');
		const data = await res.json();
		dispatch({ type: GET_LOGS, payload: data });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.statusText });
	}
};

//delete a log from list

export const deleteLog = (id) => async (dispatch) => {
	try {
		setLoading();
		await fetch(`/logs/${id}`, { method: 'DELETE' });
		dispatch({ type: DELETE_LOG, payload: id });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.statusText });
	}
};

//update current log

export const updateLog = (log) => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch(`/logs/${log.id}`, {
			method: 'PUT',
			body: JSON.stringify(log),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		dispatch({ type: UPDATE_LOG, payload: data });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.statusText });
	}
};

//set current log

export const setCurrentLog = (log) => {
	return {
		type: SET_CURRENT,
		payload: log,
	};
};

//clear current log

export const clearCurrentLog = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

//set the loading state to true
export const setLoading = () => {
	//return action to the reducer
	return {
		type: SET_LOADING,
	};
};

//search logs
export const searchLogs = (text) => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch(`/logs?q=${text}`);
		const data = await res.json();
		dispatch({ type: SEARCH_LOGS, payload: data });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.statusText });
	}
};
