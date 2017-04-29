import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { store, history } from './store/store'
import { Provider } from 'react-redux'
import CreateTimer from './components/containers/ConCreateTimer'
import RunTimer from './components/containers/ConRunTimer'
import Home from './components/ui/Home'

const App = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/timers" component={CreateTimer}/>
					<Route path="/run-timer" component={RunTimer}/>
				</div>
			</Router>
		</Provider>
	)
}

export default App
