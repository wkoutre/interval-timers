import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import mainReducer from './store/reducers'
import { setNumIntervals, setRestTime } from './actions'
import routes from './routes'
import { Provider } from 'react-redux'
import './css/style.css'
// import * as router from 'react-router-dom'

const logger = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const initialState = (localStorage["redux-timer-store"]) ?
    JSON.parse(localStorage["redux-timer-store"]) :
    {}

const store = createStore(mainReducer, initialState, logger);

const saveState = () => 
    localStorage["redux-timer-store"] = JSON.stringify(store.getState())

store.subscribe(saveState);

window.store = store;

render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('root')
)
