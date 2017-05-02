import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base';

class Login extends React.Component {

	componentWillMount() {
		console.log('mounting Login');
		
		this.ref = base.syncState(
			'test',
			{
				context: this,
				state: 'test'
			}
		);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	authenticate = (provider) => {
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler = (err, authData) => {
		if (err) {
			console.error(err);
			return ;
		}

		const uidRef = base.database().ref('users'); // to use FireBase API at"users" key on the database Tree

		uidRef.once('value', snapshot => {
			const { login } = this.props;
			const data = snapshot.val() || {};

			console.log(data); // initiallyreturns empty object, returns uidRef object once user has signed up for an account once
			console.log({authData}); // data returned from FB authentication
			const { uid, displayName, email } = authData.user;
			
			uidRef.set({
				uid
			});

			const userRef = base.database().ref(`users/${uid}`)

			userRef.set({
				displayName,
				email
			});

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
		});
	}

	renderLogin = () => {
		return (
			<div>
				<h2>Login</h2>
				<p>Please login, or create an account!</p>
				<button onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
			</div>
		)
	}	
	render() {
		return (
			<div>{this.renderLogin()}</div>
		)
	}
}

export default Login;
