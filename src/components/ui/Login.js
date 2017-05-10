import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base';
import { store } from '../../store/store'
import { push } from 'connected-react-router'
import FB from 'fb'

window.FB = FB;

// console.log(`FB`, FB);

// careful about using global variables... find a better way to do this once proof of concept is achieved

export let errorProvider;

class Login extends React.Component {

	authenticate = (provider) => {	
		base.authWithOAuthPopup(provider, this.authHandler, {
			scope: "email, user_birthday, user_photos, user_location, publish_actions, public_profile"
		});
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

			// authData: data returned from FB/Google API from FB/Google authentication

			const { uid, displayName, email, photoURL } = authData.user;

			const { accessToken } = authData.credential;

			console.groupCollapsed('login stuff')
				console.log('snapshot.val()', data);
				console.log('data[uid]', data[uid]);
				console.log('authData', authData);
			console.groupEnd('login stuff')

			// if there's a new user...
			
			if (!data[uid]){
				console.log("New user sign in");
				const uidRef = base.database().ref(`users/${uid}`);
				this.props.setFullName(displayName)
				this.props.setEmail(email)
				console.log('New user: remember to resize the photo from the photoURL');
				this.props.setPhotoURL(photoURL)

				uidRef.set({
					userInfo: {
						displayName,
						email,
						uid
					}
				})
			} else {
				console.log("Preexisting user signing");
				this.localSetInitialState(uid, data[uid]);
			}
		
			login(uid);
			this.props.push('/home');
		});
	}

	localSetInitialState = (uid, data) => {
		console.log('UID', uid);
		
		data = JSON.parse(data.store);

		this.props.setInitialState(data);
	}

	render() {
		return (
			<div className="app-login">
				<h2 className="login-title">Interval Timer</h2>
				<button className="btn-facebook login-facebook" onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
				<button className="btn-google login-facebook" onClick={() => this.authenticate('google')}>Sign In with Google</button>
				<br />
				<p className="login-p">New here? Sign in with one of the options above, or
					<span className="login-create-account"> create an account!</span>
				</p>
			</div>
		)
	}
}

export default Login;
