import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { store } from './store/store'

import App from './components/containers/ConApp'
import './css/bootstrap/css/bootstrap.min.css'
import './css/bootstrap-social/bootstrap-social.css'
import './css/style.css'

render (
		<Provider store={store}>
			<App />	
		</Provider>,	
		document.getElementById('root')
	)
