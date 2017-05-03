import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base';
import { store } from '../../store/store'

// careful about using global variables... find a better way to do this once proof of concept is achieved

class Login extends React.Component {

	componentWillMount() {
		if (localStorage['redux-timer-store']) {
			this.props.history.push('/home');
		} 
	}

	authenticate = (provider) => {
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler = (err, authData) => {
		if (err) {
			console.error(err);
			return ;
		}

		const userRef = base.database().ref('users'); // to use FireBase API at"users" key on the database Tree
	

		userRef.once('value', snapshot => {
			const { login } = this.props;
			// console.log("DATA 1:", snapshot.val())
			const data = snapshot.val() || {};

			console.log("DATA 2:", data); // initiallyreturns empty object, returns userRef object once user has signed up for an account once

			console.log("authData:", authData); // data returned from FB authentication

			const { uid, displayName, email } = authData.user;

			if (!data[uid]){
				// Do we have to explicitly set users/uid before the uidRef setting action?
				// Seems to work without it...
				userRef.set(uid)
				const uidRef = base.database().ref(`users/${uid}`);
				uidRef.set({
					userInfo: {
						displayName,
						email
					}
				})
				console.log("not in there yet");
			} else {
				this.localSetInitialState(data[uid]);
			}
			/*
			** need to update the store with user:
				if (uid exists) {
					set store === that user's data
				} else {
					create key with uid;
					set write location of store to the tree under that key
				}
			*/

			login(uid);
			
			store.subscribe(() => this.saveState(uid));
			this.props.history.push('home');
		});
	}

	saveState = (uid) => {
		base.database().ref(`users/${uid}/store`).set(JSON.stringify(store.getState()))
	}

	localSetInitialState = (data) => {
		data = JSON.parse(data.store).app;
		console.log({data});

		this.props.setInitialState(data);
	}

	render() {
		return (
			<div>
				<h2>Login</h2>
				<p>Please login, or create an account!</p>
				<button onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
			</div>
		)
	}
}

export default Login;
