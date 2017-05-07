import React from 'react'
// BrowserRouter as Router,
import { Route } from 'react-router-dom'
import { ConnectedRouter as Router, push } from 'connected-react-router'
// import { Route } from 'react-router'
import { history } from './store/store'
import CreateTimer from './components/containers/ConCreateTimer'
import RunTimer from './components/containers/ConRunTimer'
import Home from './components/containers/ConHome'
import Header from './components/containers/ConHeader'
import Login from './components/containers/ConLogin'
import ErrorPage from './components/containers/ConErrorPage'
import base from './components/Base'

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
				<Router history={history}>
				{!loggedIn ?
					<Login /> :
					<div>
							<Header />
							<Route exact path="/error" component={ErrorPage} />
							<Route exact path="/home" component={Home} />
							<Route path="/timers" component={CreateTimer}/>
							<Route path="/run-timer" component={RunTimer}/>
					</div>
					}
				</Router>
		)	
	}
}

export default App

// <Route path={"/"} component={Header} />
