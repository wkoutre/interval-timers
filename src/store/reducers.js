import C from '../constants'
import { combineReducers } from 'redux'
import { twoPlacedFloat } from '../timeHelpers';

/*
** sets app.timerInfo
*/

const numIntervals = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return ""
		case C.SET_NUM_INTERVALS:
			return +action.payload;
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return +action.payload.numIntervals
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.timerProps.numIntervals;
		default:
			return state;
	}
}

const intervalTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return "";
		case C.SET_INTERVAL_TIME:
			return +twoPlacedFloat(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return +twoPlacedFloat(action.payload.intervalTime);
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.timerProps.intervalTime;			
		default:
			return state;
	}
}

const restTime = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return "";
		case C.SET_REST_TIME:
			return +(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return +(action.payload.restTime)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.timerProps.restTime;
		default:
			return state;
	}
}

const restIncrement = (state=0, action) => {
	switch (action.type) {
		case C.CLEAR_TIMER_FORM:
			return "";
		case C.SET_REST_INCREMENT:
			return +(action.payload);
		case C.EDIT_TIMER: case C.CHOOSE_TIMER:
			return +(action.payload.restIncrement)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.timerProps.restIncrement;
		default:
			return state;
	}
}

const defaultNumIntervals = (state=0, action) => {
	switch (action.type) {
		case C.SET_DEFAULT_NUM_INTERVALS:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.defaults.defaultNumIntervals || 0;
		default:
			return state;
	}
}

const defaultIntervalMins = (state=0, action) => {
	switch (action.type) {
		case C.SET_DEFAULT_INTERVAL_MINS:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.defaults.defaultIntervalMins || 0;
		default:
			return state;
	}
}

const defaultIntervalSecs = (state=0, action) => {
	switch (action.type) {
		case C.SET_DEFAULT_INTERVAL_SECS:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.defaults.defaultIntervalSecs || 0;
		default:
			return state;
	}
}

const defaultRestMins = (state=0, action) => {
	switch (action.type) {
		case C.SET_DEFAULT_REST_MINS:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.defaults.defaultRestMins || 0;
		default:
			return state;
	}
}

const defaultRestSecs = (state=0, action) => {

	switch (action.type) {
		case C.SET_DEFAULT_REST_SECS:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.defaults.defaultRestSecs || 0;
		default:
			return state;
	}
}

const defaultRestIncrement = (state=0, action) => {
	switch (action.type) {
		case C.SET_DEFAULT_REST_INCREMENT:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.defaults.defaultRestIncrement || 0;
		default:
			return state;
	}
}

// array of objects with timer configurations
const timers = (state=[], action) => {	
	switch (action.type) {
		case C.SAVE_TIMER:
			return [
			action.payload,
			...state
			];
		case C.EDIT_TIMER:
			const { timerName } = action.payload;
			return state.filter(timers => timers.timerName !== timerName)
		case C.DELETE_TIMER:
			const { timerName: name } = action.payload;

			return state.filter(timers => timers.timerName !== name)
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.timers;
		case C.SORT_TIMERS_DATE_ASCENDING:
			const ascState = [...state].sort( (a, b) => a.timeCreated > b.timeCreated);

			return ascState;
		case C.SORT_TIMERS_DATE_DESCENDING:
			const descState = [...state].sort( (a, b) => a.timeCreated < b.timeCreated);

			return descState;
		case C.SORT_TIMERS_A_Z:
			const az = [...state].sort( (a, b) => {

				const aUpper = a.timerName.split('').map(i => i.toUpperCase()).join(''); 
				const bUpper = b.timerName.split('').map(i => i.toUpperCase()).join('');
				
				return aUpper > bUpper;
			})

			return az;

		case C.SORT_TIMERS_Z_A:
			const za = [...state].sort( (a, b) => {

				const aUpper = a.timerName.split('').map(i => i.toUpperCase()).join(''); 
				const bUpper = b.timerName.split('').map(i => i.toUpperCase()).join('');

				return aUpper < bUpper;
			})

			return za;
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
			return action.payload.app.user.timerInfo.timerProps.timerName
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
		case C.SET_LOGIN_UID:
		case C.SET_INITIAL_STATE:
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
			return action.payload || state;
		case C.LOGOUT:
			return "";
		case C.SET_INITIAL_STATE:
			return localStorage['workout-timer-uid'];
		default:
			return state;
	}
}

const fullName = (state="", action) => {
	switch (action.type) {
		case C.SET_FULLNAME:
			return action.payload;
		case C.SET_PROFILE_INFO:
			return action.payload.fullName;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.fullName;
		default:
			return state;
	}
}

const email = (state="", action) => {
	switch (action.type) {
		case C.SET_EMAIL:
			return action.payload
		case C.SET_PROFILE_INFO:
			return action.payload.email;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.email;
		default:
			return state;
	}
}

const photoURL = (state="", action) => {
	switch (action.type) {
		case C.SET_PHOTO_URL:
			return action.payload;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.photoURL;
		default:
			return state;
	}
}

const completedTimers = (state=[], action) => {
	switch (action.type) {
		case C.ADD_COMPLETED_TIMER:
			console.log(`reducerAddingCompletedTimer`, action);
			const { dateString, ms, timerName } = action;
			return [
				{
					ms: action.ms,
					timerName: action.timerName,
					dateString: action.dateString
				},
				...state
			]
		case C.REMOVE_COMPLETED_TIMER:
			return state.filter(arrObjs => action.ms !== arrObjs.ms);
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.completedTimers;
		default:
			return state;
	}
}

const weight = (state=0, action) => {
	switch (action.type) {
		case C.SET_PROFILE_INFO:
			return action.payload.weight;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.weight;
		default:
			return state;
	}
}

const location = (state="", action) => {
	switch (action.type) {
		case C.SET_PROFILE_INFO:
			return action.payload.location;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.location;
		default:
			return state;
	}
}

const birthday = (state="", action) => {
	switch (action.type) {
		case C.SET_PROFILE_INFO:
			return action.payload.birthday;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.birthday;
		default:
			return state;
	}
}

const visibility = (state="", action) => {
	switch (action.type) {
		case C.SET_PROFILE_INFO:
			return action.payload.visibility;
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.details.visibility;
		default:
			return state;
	}
}

const favorites = (state=[], action) => {
	switch(action.type) {
		case C.SET_FAVORITE:
			return [
				[action.timerObj, action.index],
				...state
			]
		case C.REMOVE_FAVORITE:
			return state.filter(obj => {
				console.log(`obj[0]`, obj[0]);
				return obj[0].timerName !== action.timerName
			})
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.favorites;
		case C.DELETE_TIMER:
			const { timerName: name } = action.payload;
			
			return state.filter(arr => arr[0].timerName !== name)
		default:
			return state;
	}
}

const rootReducer = (state, action) => {
	switch (action.type) {
		case C.LOGOUT:
			return mainReducer(undefined, action);
		case C.SET_INITIAL_STATE:
			console.log(`setting mainReducer`, action.payload);		
			return mainReducer(action.payload.app)
		default:
			return state;
	}
}

const audio = (state={}, action) => {
	switch (action.type) {
		case C.ADD_AUDIO:
			console.log(`adding audio`);
			const { audioName, url } = action
			return ({
				...state,
				[audioName]: url
			})
		case C.SET_INITIAL_STATE:
			return action.payload.app.user.timerInfo.audio;
		default:
			return state;
	}
}

const loggingIn = (state=false, action) => {
	switch (action.type) {
		case C.LOGGING_IN:
			return true;
		case C.SET_LOGIN_UID:
		case C.SET_INITIAL_STATE:
			return false;
		default:
			return state;
	}
}


/**/

// const mainReducer = (state={}, action) => {
// 	switch(action.type) {
// 		case (C.SET_INITIAL_STATE):
// 			return action.payload;
// 		default:
// 			console.log(`returning saved`);
			
// 			const saved = combineReducers({
// 								app: combineReducers({
// 									loggedIn,
// 									user: combineReducers({
// 										details: combineReducers({
// 											fullName,
// 											email,
// 											photoURL,
// 											uid,
// 											birthday,
// 											location,
// 											visibility,
// 											weight
// 										}),
// 										timerInfo: combineReducers({
// 											defaults: combineReducers({
// 												defaultNumIntervals,
// 												defaultIntervalMins,
// 												defaultRestMins,
// 												defaultRestIncrement
// 											}),
// 											timerProps: combineReducers({
// 												numIntervals,
// 												intervalTime,
// 												restTime,
// 												restIncrement,
// 												timerName
// 											}),
// 											timers,
// 											completedTimers,
// 											favorites
// 										}),
// 										currentTimer: combineReducers({
// 											timerData,
// 											timerSwitch,
// 											completedIntervals
// 										})	
// 									})
// 								})
// 							});

// 			return saved;
// 		}
// 	}

const mainReducer = combineReducers({
	app: combineReducers({
		loggedIn,
		loggingIn,
		user: combineReducers({
			details: combineReducers({
				fullName,
				email,
				photoURL,
				uid,
				birthday,
				location,
				visibility,
				weight
			}),
			timerInfo: combineReducers({
				defaults: combineReducers({
					defaultNumIntervals,
					defaultIntervalMins,
					defaultIntervalSecs,
					defaultRestMins,
					defaultRestSecs,
					defaultRestIncrement
				}),
				timerProps: combineReducers({
					numIntervals,
					intervalTime,
					restTime,
					restIncrement,
					timerName
				}),
				timers,
				completedTimers,
				favorites,
				audio
			}),
			currentTimer: combineReducers({
				timerData,
				timerSwitch,
				completedIntervals
			})	
		})
	})
});

export default mainReducer;
