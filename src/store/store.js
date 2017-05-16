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


