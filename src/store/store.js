import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = (localStorage["redux-timer-store"]) ?
    JSON.parse(localStorage["redux-timer-store"]) :
    {}

let history = createHistory();
let middleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		app: mainReducer,
		routing: routerReducer
	}),
	initialState,
	composeEnhancers(
		applyMiddleware(middleware)
	)
);

history = syncHistoryWithStore(history, store);

const saveState = () => 
    localStorage["redux-timer-store"] = JSON.stringify(store.getState())

store.subscribe(saveState);

module.exports = {
	store,
	history
}
