import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'
import { setInitialState } from '../actions'
import { getStoreData } from './getStoreData'

console.log('store is loading...');


const storeFromServer = store => next => action => {

	if (!store.getState().app.user.uid && localStorage['redux-timer-store'] !== undefined) {
		const userRef = base.database().ref(`users/${localStorage['redux-timer-store']}`);

		console.log('outside the promise');

		userRef.once('value')
			.then(snapshot => {
				
				const data = snapshot.val();
				const state = JSON.parse(data.store);				

				// store.state = 
				console.group('Setting initial state')
				console.info('oldState:', store.getState());
				console.info('state from server:', state);
				console.groupEnd('Setting initial state');

				setInitialState(state);
			})
			.catch(err => console.error(err))
	}

	// console.log("State after:", store.getState());
	

	return next(action);
}

const uid = localStorage['redux-timer-store'] || 0;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// need to grab state from uid (once logged in...
// pass it in from login function?
//

// const initialState = base.database().ref(`users/${uid}/store`) ?
// 		base.database().ref(`users/${uid}/store`) :
// 		{}
		

// const initialState = {}

// console.log({initialState});


// const initialState = (localStorage["redux-timer-store"]) ?
//     JSON.parse(localStorage["redux-timer-store"]) :
//     {}

let history = createHistory();
let middleware = routerMiddleware(history);

const store = createStore(
	mainReducer,
	composeEnhancers(
		applyMiddleware(middleware)
	)
);

history = syncHistoryWithStore(history, store);

history.listen(location => {
	if (localStorage['redux-timer-store'] && !store.getState().app.loggedIn) {
			localStorage.removeItem('redux-timer-store');
			history.push('/');
			// getStoreData().then(data => setInitialState(data));
	}
})

const saveState = () =>{
		if (localStorage['redux-timer-store']) {
    	base.database().ref(`users/${uid}/store`).set(JSON.stringify(store.getState()))
     }
  }

// store.subscribe(saveState);

module.exports = {
	store,
	history
}
