import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base';
import { store } from '../../store/store'
import { push } from 'connected-react-router'
import * as colors from '../../css/colors'
import LoggingIn from './LoggingIn'

export let errorProvider;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			manualAccount: false,
			manualLogin: false,
			userName: "",
			userEmail: "",
			userPassword: ""
 		}
	}

	clearState = () => {
		const userName = "",
					userEmail = "",
					userPassword = ""

		this.setState({ userEmail, userPassword, userName})
	}

	authenticate = (provider) => {
		this.props.changeLogin(null)
		provider === 'facebook' ?
			base.authWithOAuthPopup(provider, this.authHandler, {
				scope: "email, user_birthday, user_photos, user_location, publish_actions, public_profile"
			}) :
			base.authWithOAuthPopup(provider, this.authHandler)

			// THIS IS FOR REDIRECT LOGIN, RATHER THAN POPUP
			// localStorage['workout-timer-login']  = true;
	}

	toggleCreateAccount = (bool=false) => {
		const manualAccount = !this.state.manualAccount;
		this.setState({ manualAccount })
		if (bool)
			this.clearState();
	}

	toggleManualLogin = (bool=false) => {
		const manualLogin = !this.state.manualLogin;
		this.setState({ manualLogin })
		if (bool)
			this.clearState();
	}

	togglePasswordVisibility = () => {
		const passwordInput = document.getElementById('login-create-account__password');
		const currentType = passwordInput.type;

		passwordInput.setAttribute('type', currentType === 'password' ? 'text' : 'password');
	}

	handleChange = (e) => {
		const inputName = e.target.name;
		const val = e.target.value;

		this.setState({ [inputName]: val})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { userName, userEmail, userPassword } = this.state;

		if (this.state.manualAccount) {

			base.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
				.then(data => {
					console.log(`data`, data);
					const { uid } = data;
					this.props.login(uid);
					this.props.push('/home');
				})
				.catch(error => {
					var errorCode = error.code;
	  			var errorMessage = error.message;
				  if (errorCode == 'auth/weak-password') {
				    alert('The password is too weak.');
				  } else {
				    alert(errorMessage);
				  }
				});
				
				this.toggleCreateAccount();
				this.props.setFullName(userName)
				this.props.setEmail(userEmail);	
			} else {
				base.auth().signInWithEmailAndPassword(userEmail, userPassword)
					.then(data => this.authHandler(null, {user: data}))
					.catch(function(error) {

				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  console.log(errorCode, errorMessage);
				  if (errorCode === 'auth/wrong-password') {
				  	alert('Wrong password, please try again.')
				  }
				});
			}
		}

	// authData: data returned from FB/Google API from FB/Google authentication
	authHandler = (err, authData) => {
		if (err) {
			if (err.code == "auth/account-exists-with-different-credential") {
				errorProvider = err.credential.providerId;
				console.log(errorProvider);
				
				this.props.changeLogin(false)
				this.props.push('error')
			} else {
				console.log(`error!`);
				// this.props.refreshToLogin()
				this.props.changeLogin(false);
				alert(`There's been a problem logging in. If you're unsure of why, please email wkoutre@gmail.com. NOTE: Signing in will NOT work in private/incognito browing mode.`)
			}
			return ;
		}

		// to use FireBase API at"users" key on the database Tree
		const userRef = base.database().ref('users');
		if (!authData)
			console.log(`no authdata`);
			

		// gets a 'snapshot' of the 'users' key in the DB
		// in my case, the values at the 'users' key are the UIDs associated with users' login tokens
		userRef.once('value', snapshot => {
			const { login } = this.props;
			const data = snapshot.val() || {};
			const { uid, displayName, email, photoURL } = authData.user;
			
			// 'data' is initially an empty object; then it's the userRef object once user has signed up for an account once

			// console.groupCollapsed('login stuff')
			// 	console.log('snapshot.val()', data);
			// 	console.log('data[uid]', data[uid]);
			// 	console.log('authData', authData);
			// console.groupEnd('login stuff')

			// if there's a new user...
			if (!data[uid]){
				console.log("New user sign in");
				const uidRef = base.database().ref(`users/${uid}`);
				this.props.setFullName(displayName)
				this.props.setEmail(email)
				this.props.setPhotoURL(photoURL)

				// console.log('New user: remember to resize the photo from the photoURL');

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

			// sets store's 'login' to true to true
			this.props.changeLogin(true);
			login(uid);
		});
	}

	localSetInitialState = (uid, data) => {
		data = JSON.parse(data.store);
		this.props.setInitialState(data);
	}

	render() {
		const accountForm = (
					<div className="login-account__overlay">
						<form onSubmit={(e) => this.handleSubmit(e)} className="login-manual-account__form">
							<h1>Create Account</h1>
							<label className="login-create-account__label" htmlFor="userName">Full Name</label>
							<input required className="login-manual-account__input" value={this.state.userName} onChange={e => this.handleChange(e)} name="userName" type="text" placeholder="full name"/>
							<label className="login-create-account__label" htmlFor="userEmail">Email</label>
							<input required className="login-manual-account__input" value={this.state.userEmail} onChange={e => this.handleChange(e)} name="userEmail" type="email" placeholder="email"/>
							<label onClick={() => this.togglePasswordVisibility()} className="login-create-account__label" htmlFor="userPassword">Password<br/><span id="password-visibility">Show/Hide</span></label>
							<input required id="login-create-account__password" className="login-manual-account__input"  value={this.state.userPassword} onChange={e => this.handleChange(e)} name="userPassword" type="password" placeholder="password"/>
							<button onSubmit={(e) => this.handleSubmit(e)}className="login-manual-account__button">Submit</button>
							<span onClick={() => this.toggleCreateAccount(true)} className="login-hide-form">x</span>
						</form>

					</div>
			)

		const manualForm = (
					<div className="login-account__overlay">
						<form onSubmit={(e) => this.handleSubmit(e)} className="login-manual-account__form">
							<h1>Login</h1>
							<label className="login-create-account__label" htmlFor="userEmail">Email</label>
							<input required className="login-manual-account__input" value={this.state.userEmail} onChange={e => this.handleChange(e)} name="userEmail" type="email" placeholder="email"/>
							<label onClick={() => this.togglePasswordVisibility()} className="login-create-account__label" htmlFor="userPassword">Password<br/><span id="password-visibility">Show/Hide</span></label>
							<input required id="login-create-account__password" className="login-manual-account__input"  value={this.state.userPassword} onChange={e => this.handleChange(e)} name="userPassword" type="password" placeholder="password"/>
							<button onSubmit={(e) => this.handleSubmit(e)}className="login-manual-account__button">Login</button>
							<span onClick={() => this.toggleManualLogin(true)} className="login-hide-form">x</span>
						</form>
					</div>
			)
		
		return (
			<div className="app-login">
					<h2 className="login-title">Interval Timer</h2>
					<button className="btn-facebook login-facebook" onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
					<button className="btn-google login-facebook" onClick={() => this.authenticate('google')}>Sign In with Google</button>
					<br />
					<p className="login-p">
						<span onClick={() => this.toggleManualLogin()} className="login-manual">Sign in with your email</span>, or
						<span onClick={() => this.toggleCreateAccount()} className="login-create-account"> create an account!</span>
					</p>
					{this.state.manualAccount && accountForm}
					{this.state.manualLogin && manualForm}
				</div>
		)
	}
}

export default Login;
