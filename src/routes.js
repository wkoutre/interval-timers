import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, push } from 'connected-react-router'
import { history } from './store/store'

import base from './components/Base'

import Login from './components/containers/ConLogin'
import Header from './components/containers/ConHeader'
import Footer from './components/containers/ConFooter'
import Home from './components/containers/ConHome'
import CreateTimer from './components/containers/ConCreateTimer'
import RunTimer from './components/containers/ConRunTimer'
import Profile from './components/containers/ConProfile'
import ErrorPage from './components/containers/ConErrorPage'


class App extends React.Component {
	// componentWillMount() {
	// 	console.log('Router', Router);
		
	// 	// const loggedIn = localStorage['workout-timer-uid'] ? true : false;
	// 	console.log(`Don't need to use history in ROUTES... could just render Login if not logged in, everything else otherwise`);
		
	// 	const loggedIn = store.getState().app.loggedIn;

	// 	console.groupCollapsed('App is mounting');
	// 		console.log("App: pathname = ", history.location.pathname);
	// 		console.log("App: loggedIn = ", loggedIn);
	// 	console.groupEnd('App is mounting');
		
	// 	if (history.location.pathname !== '/' && !loggedIn) {
	// 		console.log('routesWillMount: pushing back to /');
	// 		store.dispatch(push('/'))
	// 	}
	// }

	render() {
		
	const { loggedIn } = this.props;
		return (
				<ConnectedRouter history={history}>
				{!loggedIn ?
					<Login /> :
					<div>
						<Header />
						<Switch>
							<Redirect exact from="/" to="/home" />
							<Route path="/error" component={ErrorPage} />
							<Route path="/home" component={Home} />
							<Route path="/timers" component={CreateTimer}/>
							<Route path="/run-timer" component={RunTimer}/>
							<Route path="/profile" component={Profile}/>
						</Switch>
						<Footer />
					</div>
					}
				</ConnectedRouter>
		)	
	}
}

export default App

// <Route path={"/"} component={Header} />
