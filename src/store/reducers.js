import C from '../constants'
import { combineReducers } from 'redux'

const numIntervals = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_NUM_INTERVALS:
			return action.payload;
		case C.EDIT_TIMER:
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
			return action.payload;
		case C.EDIT_TIMER:
			return +(action.payload.intervalTime)
		default:
			return state;
	}
}

const restTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_REST_TIME:
			return action.payload;
		case C.EDIT_TIMER:
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
			return action.payload;
		case C.EDIT_TIMER:
			return parseInt(action.payload.restIncrement)
		default:
			return state;
	}
}

// array of objects with timer configurations
const timers = (state=[], action) => {
	return action.type === C.SAVE_TIMER ?
		[
			...state,
			action.payload
		] :
		state
}

const timerName = (state="", action) => {
	switch (action.type) {
		case C.CLEAR_FORM:
			return 0;
		case C.SET_TIMER_NAME:
			return action.payload;
		case C.EDIT_TIMER:
			return action.payload.timerName
		default:
			return state;
	}
}

export default combineReducers({
	numIntervals,
	intervalTime,
	restTime,
	restIncrement,
	timerName,
	timers
})
