import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Route } from 'react-router'
import { store, history } from './store/store'
import { Provider } from 'react-redux'
import CreateTimer from './components/containers/ConCreateTimer'
import RunTimer from './components/containers/ConRunTimer'
import Home from './components/containers/ConHome'
import Login from './components/containers/ConLogin'
import ErrorPage from './components/containers/ConErrorPage'
import base from './components/Base'

class App extends React.Component {
	componentWillMount() {
		const loggedIn = localStorage['workout-timer-uid'] ? true : false;
		// const loggedIn = base.getAuth() !== null ? true :
		// 	 false;

		console.log('App is mounting');
		console.log("App: pathname = ", history.location.pathname);
		console.log("App: loggedIn = ", loggedIn);
		
		if (history.location.pathname !== '/' && !loggedIn) {
			console.log('routesWillMount: pushing back to /');
			history.push('/');
			history.go();
		}
	}

	render() {		
		return (
			<Provider store={store}>
				<Router history={history}>
					<div>
						<Route exact path="/home" component={Home} />
						<Route exact path="/" component={Login} />
						<Route exact path="/error" component={ErrorPage} />
						<Route path="/timers" component={CreateTimer}/>
						<Route path="/run-timer" component={RunTimer}/>
					</div>
				</Router>
			</Provider>
		)	
	}
}

export default App
