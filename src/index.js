import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

// import { setNumIntervals, setRestTime } from './actions'

import App from './routes'

import './css/style.css'

render(
	<App />,
	document.getElementById('root')
)
