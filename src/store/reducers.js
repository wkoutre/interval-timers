import C from '../constants'
import { combineReducers } from 'redux'
import { twoPlacedFloat } from '../timeHelpers';

/*
** sets app.timerProps
*/

const numIntervals = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_NUM_INTERVALS:
			return parseInt(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return parseInt(action.payload.numIntervals)
		default:
			return state;
	}
}

const intervalTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_INTERVAL_TIME:
		
			return twoPlacedFloat(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return twoPlacedFloat(action.payload.intervalTime);
		default:
			return state;
	}
}

const restTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_REST_TIME:
			return parseInt(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return parseInt(action.payload.restTime)
		default:
			return state;
	}
}

const restIncrement = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_REST_INCREMENT:
			return parseInt(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return parseInt(action.payload.restIncrement)
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
		default:
			return state
	}
}

const timerName = (state="", action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return "";
		case C.SET_TIMER_NAME:
			return action.payload;
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return action.payload.timerName
		default:
			return state;
	}
}

const totalTime = (state=0, action) => {
	switch (action.type) {
		case C.SET_TOTAL_TIME:
			return action.payload;
		default:
			return state
	}
}

/*
** sets app.currentTImer
** reference for app.runningTimer
*/

const timerData = (state={}, action) => {
	switch (action.type) {
		case C.CHOOSE_TIMER:
			return action.payload;
		default:
			return state;
	}
}

/**/

export default combineReducers({
	timerProps: combineReducers({
		numIntervals,
		intervalTime,
		restTime,
		restIncrement,
		timerName,
		timers
	}),
	currentTimer: combineReducers({
		timerData
	})
})
