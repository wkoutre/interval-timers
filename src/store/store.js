import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'
import { setunsubscribeSyncId } from '../actions'
import { getStoreData } from './getStoreData'

window.clear = () => localStorage.clear();
window.base = base;

console.log('store.js is loading...');

// const checkLoginMiddleware = store => next => action => {
// 	console.group('checkLoginMiddleware');
// 	console.log(store.getState().app.loggedIn);
// 	if (!store.getState().app.loggedIn && localStorage['workout-timer-uid'] === undefined) {
// 		console.log('middleware to the rescue');
		
// 		history.push('/');
// 	}
// 	console.groupEnd('checkLoginMiddleware');

	
	// if (!store.getState().app.loggedIn && history.location.pathname !== '/') {
	// 	history.push('/');
	// }

// 	return next(action);
// }

const uid = localStorage['workout-timer-uid'] || 0;
const initialState = localStorage['workout-timer-app'] ?
	JSON.parse(localStorage['workout-timer-app']) :
	{}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	mainReducer,
	initialState,
	composeEnhancers(
		applyMiddleware(middleware)
	)
);

history = syncHistoryWithStore(history, store);

const syncStateServerAndLocal = () => {
		const stringified = JSON.stringify(store.getState());
		base.database().ref(`users/${uid}/store`).set(stringified)
		localStorage.setItem('workout-timer-app', stringified);
	}

const saveStateToLocal = () => {
	const stringified = JSON.stringify(store.getState());
}

if (localStorage['workout-timer-uid']) {
	console.log('Restoring state from page refresh!');
 	const unsubscribeSyncId = store.subscribe(syncStateServerAndLocal); 
	setunsubscribeSyncId(unsubscribeSyncId);	
}

module.exports = {
	store,
	history
}
