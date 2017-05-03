import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter as History } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers'
import base from '../components/Base'

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

// const saveState = () =>{
// 		if (uid !== "") {
//     	base.database().ref(`users/${uid}/store`).set(JSON.stringify(store.getState()))
//         console.log({uid});
//      }
//   }

// store.subscribe(saveState);

module.exports = {
	store,
	history
}
