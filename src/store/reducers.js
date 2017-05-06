import C from '../constants'
import { combineReducers } from 'redux'
import { twoPlacedFloat } from '../timeHelpers';
import { routerReducer } from 'react-router-redux'

/*
** sets app.timerProps
*/

const numIntervals = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return 0;
		case C.SET_NUM_INTERVALS:
			return parseInt(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return parseInt(action.payload.numIntervals)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerProps.numIntervals;
		default:
			return state;
	}
}

const intervalTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return 0;
		case C.SET_INTERVAL_TIME:
			return twoPlacedFloat(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return twoPlacedFloat(action.payload.intervalTime);
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerProps.intervalTime;			
		default:
			return state;
	}
}

const restTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return 0;
		case C.SET_REST_TIME:
			return parseInt(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return parseInt(action.payload.restTime)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerProps.restTime;
		default:
			return state;
	}
}

const restIncrement = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return 0;
		case C.SET_REST_INCREMENT:
			return parseInt(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return parseInt(action.payload.restIncrement)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerProps.restIncrement;
		default:
			return state;
	}
}

// array of objects with timer configurations
const timers = (state=[], action) => {	
	switch (action.type) {
		case C.SAVE_TIMER:
			return [
			...state,
			action.payload
			];
		case C.EDIT_TIMER:
			const { timerName } = action.payload;
			return state.filter(timers => timers.timerName !== timerName)
		case C.DELETE_TIMER:
			const { timerName: name } = action.payload;

			return state.filter(timers => timers.timerName !== name)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerProps.timers;
		default:
			return state
	}
}

const timerName = (state="", action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return "";
		case C.SET_TIMER_NAME:
			return action.payload;
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return action.payload.timerName
		case C.SET_INITIAL_STATE:		
			return action.payload.app.user.timerProps.timerName
		default:
			return state;
	}
}

const totalTime = (state=0, action) => {
	switch (action.type) {
		case C.SET_TOTAL_TIME:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.currentTimer.timerData.totalTime;
		default:
			return state
	}
}

/*
** sets app.currentTimer
** reference for app.runningTimer
*/

const timerData = (state={}, action) => {
	switch (action.type) {
		case C.CHOOSE_TIMER:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.currentTimer.timerData;
		default:
			return state;
	}
}

const timerSwitch = (state=0, action) => {
	switch (action.type) {
		case C.START_TIMER:
			return action.payload;
		case C.STOP_TIMER:
			clearInterval(state);
			return state;
		case C.CLEAR_TIMER:
			clearInterval(state);
			return 0;
		default:
			return state;
	}
}

const completedIntervals = (state=0, action) => {
	switch (action.type) {
		case C.INCREMENT_INTERVALS:
			return state + 1;
		case C.SET_INITIAL_INTERVAL:
			return 0;
		default:
			return state;
	}
}

const loggedIn = (state=false, action) => {
	switch (action.type) {
		case C.SET_LOGIN_UID: case C.SET_INITIAL_STATE:
			return true
		case C.LOGOUT:
			return false;
		default:
			return state;
	}
}

const uid = (state="", action) => {
	switch (action.type) {
		case C.SET_LOGIN_UID:
			return action.payload;
		case C.LOGOUT:
			return "";
		case C.SET_INITIAL_STATE:
			return localStorage['workout-timer-uid'];
		default:
			return state;
	}
}

const rootReducer = (state, action) => {
	switch (action.type) {
		case C.LOGOUT:
			return mainReducer(undefined, action);
		default:
			return state;
	}
}

const unsubscribeId = (state=() => null, action) => {
	switch (action.type) {
		case C.SET_UNSUBSCRIBE:
			return action.payload;
		// case C.SET_INITIAL_STATE:
		// 	return localStorage['workout-']
		case C.LOGOUT:
			state();
			return () => null;
		default:
			return state;
	}
}

/**/

const mainReducer = combineReducers({
	app: combineReducers({
		loggedIn,
		user: combineReducers({
			uid,
			unsubscribeId,
			timerProps: combineReducers({
				numIntervals,
				intervalTime,
				restTime,
				restIncrement,
				timerName,
				timers
			}),
			currentTimer: combineReducers({
				timerData,
				timerSwitch,
				completedIntervals
			})	
		})
	}),
	routing: routerReducer
});

export default mainReducer;
