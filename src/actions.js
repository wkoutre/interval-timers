import C from './constants'

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

export const clearForm = () =>
		({
			type: C.CLEAR_FORM
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

// export const startTimer = (intervalID) =>
// 	({
// 		type: C.START_TIMER,
// 		payload: intervalID
// 	})

// export const stopTimer = () =>
// 	({ type: C.STOP_TIMER })

// export const incrementIntervals = () =>
// 	({
// 		type: C.INCREMENT_INTERVALS
// 	})

// export const setInitialInterval = () =>
// 	({
// 		type: C.SET_INITIAL_INTERVAL
// 	})
