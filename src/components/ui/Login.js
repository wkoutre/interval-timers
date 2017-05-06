import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base';
import { store } from '../../store/store'

// careful about using global variables... find a better way to do this once proof of concept is achieved

export let errorProvider;

class Login extends React.Component {

	componentWillMount() {
		if (localStorage['workout-timer-uid']) {
			this.props.history.push('/home');
		}
	}

	authenticate = (provider) => {	
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler = (err, authData) => {
		if (err) {
			if (err.code == "auth/account-exists-with-different-credential") {
				errorProvider = err.credential.providerId;
				console.log(errorProvider);
				
				this.props.history.push('error')
			}
			return ;
		}

		const userRef = base.database().ref('users'); // to use FireBase API at"users" key on the database Tree
	

		userRef.once('value', snapshot => {
			const { login } = this.props;
			const data = snapshot.val() || {};
			

			// 'data' is initially an empty object; then it's the userRef object once user has signed up for an account once

			// authData: data returned from FB API from FB authentication

			const { uid, displayName, email } = authData.user;

			console.group('login stuff')
			console.log(data);
			console.log(data[uid]);
			console.log(authData);
			console.groupEnd('login stuff')

			// need to account for Facebook's different API...

			// if there's a new user
			console.log("*** UID ***", uid);
			
			if (!data[uid]){
				const uidRef = base.database().ref(`users/${uid}`);
				uidRef.set({
					userInfo: {
						displayName,
						email,
						uid
					}
				})
				login(uid);
				console.log("New user sign in");
			} else {
				console.log("Preexisting user signing");
				// uid = 
				this.localSetInitialState(uid, data[uid]);
			}

			console.log('Setting serverSyncing');
			
			const serverSyncing = store.subscribe(() => this.syncStateServerAndLocal(uid));

			this.props.setunsubscribeSyncId(serverSyncing);
			this.props.history.push('home');
		});
	}

	saveStateToLocal = () => {
		const stringified = JSON.stringify(store.getState());
	}

	syncStateServerAndLocal = (uid) => {
		const stringified = JSON.stringify(store.getState());
		base.database().ref(`users/${uid}/store`).set(stringified)
		localStorage.setItem('workout-timer-app', stringified);
	}

	localSetInitialState = (uid, data) => {
		data = JSON.parse(data.store);
		data.app.user.uid = uid;

		this.props.setInitialState(data);
	}

	render() {
		return (
			<div>
				<h2>Login</h2>
				<p>Please login, or create an account!</p>
				<button onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
				<button onClick={() => this.authenticate('google')}>Login with Google</button>
			</div>
		)
	}
}

export default Login;
