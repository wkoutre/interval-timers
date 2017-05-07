import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import mainReducer from './reducers'
import base from '../components/Base'
import { syncingMiddleware } from'./mainMiddleware'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

window.clear = () => localStorage.clear();
window.base = base;

console.log('store.js is loading...');

const uid = localStorage['workout-timer-uid'];
const initialState = localStorage['workout-timer-app'] ?
	JSON.parse(localStorage['workout-timer-app']) :
	{}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	connectRouter(history)(mainReducer),
	initialState,
	composeEnhancers(
		applyMiddleware(
			middleware, syncingMiddleware, routerMiddleware(history)
		)
	)
);

module.exports = {
	store,
	history
}

console.log('Store LOADED');
