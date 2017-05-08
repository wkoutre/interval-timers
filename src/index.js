import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { store } from './store/store'

// import { setNumIntervals, setRestTime } from './actions'

import App from './components/containers/ConApp'

import './css/style.css'

console.log('STORE INITIALLY', store.getState().app);

render(
	<Provider store={store}>
		<App />	
	</Provider>,	
	document.getElementById('root')
)
