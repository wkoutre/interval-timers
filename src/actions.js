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

export const setDefaultNumIntervals = (num) => {
	return ({
		type: C.SET_DEFAULT_NUM_INTERVALS,
		payload: +num
	})
}

export const setDefaultRestMins = (time) =>
	({
		type: C.SET_DEFAULT_REST_MINS,
		payload: +time
	})

export const setDefaultRestSecs = (time) => 
	({
		type: C.SET_DEFAULT_REST_SECS,
		payload: +time
	})

export const setDefaultIntervalMins = (time) =>
	({
		type: C.SET_DEFAULT_INTERVAL_MINS,
		payload: +time
	})

export const setDefaultIntervalSecs = (time) =>
	({
		type: C.SET_DEFAULT_INTERVAL_SECS,
		payload: +time
	})

export const setDefaultRestIncrement = (seconds) =>
	({
		type: C.SET_DEFAULT_REST_INCREMENT,
		payload: +seconds
	})

export const setTimerName = (name) =>

	// ({
	// 	meta: {
	// 		debounce: 'createTimer'
	// 	},
	// 	type: C.SET_TIMER_NAME,
	// 	payload: name
	// })

	({
		type: C.SET_TIMER_NAME,
		payload: name
	})

export const saveTimer = (obj) => {
	const { timerName, numIntervals, intervalTime, restTime, restIncrement, totalTime, timeCreated } = obj;

	return ({
		type: C.SAVE_TIMER,
		payload: {
			timerName,
			numIntervals,
			intervalTime,
			restTime,
			restIncrement,
			totalTime,
			timeCreated
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

export const setFullName = fullName =>
	({
		type: C.SET_FULLNAME,
		payload: fullName
	})

export const setEmail = email =>
	({
		type: C.SET_EMAIL,
		payload: email
	})

export const setPhotoURL = url =>
	({
		type: C.SET_PHOTO_URL,
		payload: url
	})

export const logout = () => {

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

export const addCompletedTimer = ({ dateString, ms, timerName }) => {
	console.groupCollapsed('After Dispatching addCompletedTimer ');
			console.log(`ms`, ms);
			console.log(`timerName`, timerName);
			console.log(`dateString`, dateString);
		console.groupEnd('After Dispatching addCompletedTimer ');
	
	return ({
		type: C.ADD_COMPLETED_TIMER,
		timerName,
		ms,
		dateString
	})
}
	
export const removeCompletedTimer = (ms) =>
	({
		type: C.REMOVE_COMPLETED_TIMER,
		ms
	})

export const setProfileInfo = (infoObj) =>
	({
		type: C.SET_PROFILE_INFO,
		payload: infoObj
	})

export const sortDateAscending = () =>
	({
		type: C.SORT_TIMERS_DATE_ASCENDING
	})

export const sortDateDescending = () =>
	({
		type: C.SORT_TIMERS_DATE_DESCENDING
	})

export const sortTimersAZ = () =>
	({
		type: C.SORT_TIMERS_A_Z
	})

export const sortTimersZA = () =>
	({
		type: C.SORT_TIMERS_Z_A
	})

export const setFavorite = ({index, timerObj}) => {
	
	return ({
		type: C.SET_FAVORITE,
		timerObj,
		index
	})
}
	
export const removeFavorite = (timerName) =>
	({
		type: C.REMOVE_FAVORITE,
		timerName
	})

export const checkUserStatus = () =>
	({
		type: C.CHECK_USER_STATUS
	})

export const addAudio = ({ audioName, url }) => {
	console.log(`audioName`, audioName);
	console.log(`url`, url);

	return ({
		type: C.ADD_AUDIO,
		audioName,
		url
	})
}
	
export const loggingIn = () =>
	({
		type: C.LOGGING_IN
	})
