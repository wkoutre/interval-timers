import C from './constants'
import base from './components/Base'

/*
** TIMER PROPS
*/

export const setNumIntervals = (num) => {
	return ({
		type: C.SET_NUM_INTERVALS,
		payload: num
	})
}

export const setRestTime = (time) =>
	({
		type: C.SET_REST_TIME,
		payload: time
	})

export const setIntervalTime = (time) =>
	({
		type: C.SET_INTERVAL_TIME,
		payload: time
	})

export const setRestIncrement = (seconds) =>
	({
		type: C.SET_REST_INCREMENT,
		payload: seconds
	})

export const setTimerName = (name) =>
	({
		type: C.SET_TIMER_NAME,
		payload: name
	})

export const saveTimer = (obj) => {
	const { timerName, numIntervals, intervalTime, restTime, restIncrement, totalTime } = obj;

	return ({
		type: C.SAVE_TIMER,
		payload: {
			timerName,
			numIntervals,
			intervalTime,
			restTime,
			restIncrement,
			totalTime
		}
	})
}

export const clearTimerForm = () =>
		({
			type: C.CLEAR_TIMER_FORM
		})

export const editTimer = (props) =>
	({
		type: C.EDIT_TIMER,
		payload: props
	})

export const deleteTimer = (props) =>
	({
		type: C.DELETE_TIMER,
		payload: props
	})


// sets runningTimer
export const chooseTimer = (props) =>
	({
		type: C.CHOOSE_TIMER,
		payload: props
	})

export const setTotalTime = (ms) =>
	({
		type: C.SET_TOTAL_TIME,
		payload: ms
	})

export const login = (uid) => {
	localStorage.setItem("workout-timer-uid", uid);

	return ({
		type: C.SET_LOGIN_UID,
		payload: uid
	})
}
	

export const logout = () => {

	localStorage.removeItem('workout-timer-uid');
	localStorage.removeItem('workout-timer-app');

	return ({
		type: C.LOGOUT
	})
}

export const setInitialState = (uidState) => {
	console.groupCollapsed('ACTION: setInitialState');
	console.log('action.payload:',uidState);
	console.groupEnd('setInitialState action');

	localStorage.setItem("workout-timer-uid", uidState.app.user.uid);
	
	return ({
		type: C.SET_INITIAL_STATE,
		payload: uidState
	})
}
