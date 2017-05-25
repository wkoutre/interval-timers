import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, push } from 'connected-react-router'
import { history } from '../store/store'
import { getUserStatus, getUserStore } from '../store/mainMiddleware'
import setAudioFiles from '../audio/audio'
import base from './Base'

import Login from './containers/ConLogin'
import Header from './containers/ConHeader'
import Footer from './containers/ConFooter'
import Home from './containers/ConHome'
import CreateTimer from './containers/ConCreateTimer'
import RunTimer from './containers/ConRunTimer'
import Profile from './containers/ConProfile'
import ErrorPage from './containers/ConErrorPage'
import Settings from './containers/ConSettings'
import CompletedTimers from './containers/ConCompletedTimers'
import SavedTimers from './containers/ConSavedTimers'

class App extends React.Component {


	// THIS IS FOR REDIRECT LOGIN, RATHER THAN POPUP
	
	// getUserStatus = () => {
	//   this.props.checkUserStatus();
	//   localStorage.removeItem('workout-timer-login');
	//   return new Promise( (resolve, reject) => {
	//     base.auth().onAuthStateChanged( (user, error, completed) => {
	//       if (user) {
	//         const userRef = base.database().ref('users');
	//         userRef.once('value', snapshot => {
	//         	const auth = base.getAuth();
	//         	const database = snapshot.val();
	//         	const { uid } = auth;

	//         	if (!database[uid]) {
	//         		const uidRef = base.database().ref(`users/${uid}`);
	//         		const { displayName, email, photoURL } = user;

	// 						this.props.setFullName(displayName)
	// 						this.props.setEmail(email)
	// 						console.log('New user: remember to resize the photo from the photoURL');
	// 						this.props.setPhotoURL(photoURL)

	// 						uidRef.set({
	// 							userInfo: {
	// 								displayName,
	// 								email,
	// 								uid
	// 							}
	// 						})

	// 						this.props.login(uid);
	//         	} else {
	// 	        	const parsedStore = JSON.parse(database[uid].store);
	// 	        	// console.log(`parsedStore`, parsedStore);
	// 	      		this.props.setInitialState(parsedStore);
	// 						this.props.login(uid);  	
	// 	        }
	//         })
	//       } else if (completed) {
	//       	console.log(`completed`, completed);
	//       } else {
	//       	console.log(`error`, error);
	//       	reject(error)
	//       }
	//     });
	//   });
	// };


	// THIS IS FOR REDIRECT LOGIN, RATHER THAN POPUP

	// componentWillMount() {
	// 	if (localStorage['workout-timer-login']) {
	// 		this.getUserStatus()
	// 			.catch(err => this.props.push('/error'))
	// 	}
	// }

	
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

	componentWillMount() {
		this.props.setLoggingIn();
		Object.keys(this.props.audio).length === 0 && setAudioFiles();
		getUserStatus()
			.then(uid => getUserStore(uid))
			.then(store => this.props.setInitialState(store))
			.catch(err => this.props.refreshToLogin())
	}

	LocalLogin = () => {
		return (
			<div className="react-root">
				<Login />
			</div>
		)
	}

	render() {

		return (
				<ConnectedRouter history={history}>
				{!this.props.loggedIn ?
					<Switch>
						<Route path="/error" component={ErrorPage} />
						<Route exact path="/" component={this.LocalLogin} />
						<Redirect from="/*" to="/"/>
					</Switch>
					 :
					<div className="react-root">
						<Header />
						<div className="page-content">
							<Switch>
								<Redirect exact from="/" to="/home" />
								<Route path="/error" component={ErrorPage} />
								<Route path="/home" component={Home} />
								<Route path="/create-timer" component={CreateTimer}/>
								<Route path="/run-timer" component={RunTimer}/>
								<Route path="/profile" component={Profile}/>
								<Route path="/settings" component={Settings}/>
								<Route path="/saved-timers" component={SavedTimers}/>
								<Route path="/completed-timers" component={CompletedTimers}/>
							</Switch>	
						</div>
						<Footer />
					</div>
					}
				</ConnectedRouter>
		)	
	}
}

export default App

// <Route path={"/"} component={Header} />
