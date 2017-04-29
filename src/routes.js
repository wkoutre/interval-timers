import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import createHistory from 'history'
import CreateTimer from './components/containers/CreateTimer'

// import { BrowserRouter } from 'react-router-dom'
// import { App } from './components'

const routes = (
	<Router>
		<Route exact path="/" component={CreateTimer} />
	</Router>
)	

export default routes 
