import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import mainReducer from './reducers'
import base from '../components/Base'
import { syncingMiddleware } from'./mainMiddleware'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createDebounce from 'redux-debounce'

console.log('store.js is loading...');

window.base = base;

const uid = localStorage['workout-timer-uid'];
const initialState = localStorage['workout-timer-app'] ?
	JSON.parse(localStorage['workout-timer-app']) :
	{}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const config = {
	createTimer: 500
}

const debouncer = createDebounce(config)
const createMiddleware = composeEnhancers(applyMiddleware(historyMiddleware, debouncer, syncingMiddleware))
const store = createMiddleware(createStore)(connectRouter(history)(mainReducer), initialState)

console.log('Store LOADED');

module.exports = {
	store,
	history
}


/*let store;

console.log('store.js is loading...');

window.base = base;
console.log(`typeof getAuth`, typeof base.auth());
console.log(`obj getAuth`, base.auth());

const localSetInitialState = (uid, data) => {
		console.log('local set UID', uid);
		
		// data = JSON.parse(data.store);

		this.props.setInitialState(data);
	}

function prom() {
	return new Promise(function(resolve, reject) {
			setTimeout( () => {
				const auth = base.getAuth();
				if (auth !== null) {
					console.log('auth', auth);
					// const { uid: authUID } = auth;
					
					const userRef = base.database().ref('users');
					userRef.once('value', snapshot => {
						const data = snapshot.val();
						const { uid } = auth;
						resolve(uid, JSON.parse(data[uid]))
				})
			} else {
				reject(console.log(`rejecting`));
			}
		}, 1000)
	})
}

prom(status)
	.then( (uid, serverStore) => {
		// const uid = localStorage['workout-timer-uid'] || base.auth().currentUser ? base.auth().currentUser.uid : null
		console.log(`uid`, uid);
		console.log(`serverStore`, serverStore);
		localSetInitialState(uid, serverStore);
		login(uid);
		const initialState = serverStore;
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		const history = createBrowserHistory();
		const historyMiddleware = routerMiddleware(history);
		const config = {
			createTimer: 500
		}

		const debouncer = createDebounce(config)
		const createMiddleware = composeEnhancers(applyMiddleware(historyMiddleware, debouncer, syncingMiddleware))
		store = createMiddleware(createStore)(connectRouter(history)(mainReducer), initialState)

		this.props.push('/home');
		console.log('Store LOADED');
	})
	.catch(err => {
		console.log(`err:`, err);
	})

module.exports = {
	store,
	history
}
*/
