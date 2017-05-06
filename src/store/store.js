import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'
import { syncingMiddleware } from'./mainMiddleware'

window.clear = () => localStorage.clear();
window.base = base;

console.log('store.js is loading...');

const uid = localStorage['workout-timer-uid'];
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
		applyMiddleware(middleware, syncingMiddleware)
	)
);

history = syncHistoryWithStore(history, store);

module.exports = {
	store,
	history
}

console.log('Store LOADED');
