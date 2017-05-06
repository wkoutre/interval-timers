import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'
import { setunsubscribeSyncId } from '../actions'
import { getStoreData } from './getStoreData'

let store, history;

(async () => {
	const initialState = await getStoreData();

	console.log("InitialState Async:", initialState);

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	history = createHistory();
	const middleware = routerMiddleware(history);

	store = createStore(
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
	})();

module.exports = {
	store,
	history
}
