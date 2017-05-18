import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base';
import { store } from '../../store/store'
import { push } from 'connected-react-router'
import * as colors from '../../css/colors'

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
		provider === 'facebook' ?
			base.authWithOAuthPopup(provider, this.authHandler, {
				scope: "email, user_birthday, user_photos, user_location, publish_actions, public_profile"
			}) :
			base.authWithOAuthPopup(provider, this.authHandler);
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

			console.group('NEW USER');
				console.log(`Name: ${userName}`);
				console.log(`Email: ${userEmail}`);
				console.log(`Password: ${this.state.userPassword}`);
			console.groupEnd('NEW USER');

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
				  	// const passwordInput = document.getElementById("login-existing-password");
				  	// passwordInput.setAttribute('border', `1px solid ${colors.red}`)
				  	alert('Wrong password, please try again.')
				  }
				});
			}
		}

	// blinkInputBorder = (el) => {

	// 						console.log(`el`, el);
							
	// 	const color = el.style.color;

	// 	const blinking = setInterval( () => {
	// 		if (color !== colors.red)
	// 			el.setAttribute('border', '1px solid white');
	// 		else
	// 			`1px solid ${colors.red}`;
	// 	}, 200)

	// 	setTimeout(blinking, 1000);
	// }

	authHandler = (err, authData) => {
		if (err) {
			if (err.code == "auth/account-exists-with-different-credential") {
				errorProvider = err.credential.providerId;
				console.log(errorProvider);
				
				this.props.push('error')
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

			// const { accessToken } = authData.credential;

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
		const accountForm = (
					<div className="login-account__overlay">
						<form onSubmit={(e) => this.handleSubmit(e)} className="login-manual-account__form">
							<h1>Create Account</h1>
							<label className="login-create-account__label" htmlFor="userName">Full Name</label>
							<input required className="login-manual-account__input" value={this.state.userName} onChange={e => this.handleChange(e)} name="userName" type="text" placeholder="full name"/>
							<label className="login-create-account__label" htmlFor="userEmail">Email</label>
							<input required className="login-manual-account__input" value={this.state.userEmail} onChange={e => this.handleChange(e)} name="userEmail" type="email" placeholder="email"/>
							<label className="login-create-account__label" htmlFor="userPassword">Password<br/><span onClick={() => this.togglePasswordVisibility()} id="password-visibility">Show/Hide</span></label>
							<input required id="login-create-account__password" className="login-manual-account__input"  value={this.state.userPassword} onChange={e => this.handleChange(e)} name="userPassword" type="password" placeholder="password"/>
							<button onSubmit={(e) => this.handleSubmit(e)}className="login-manual-account__button">Submit</button>
							<span onClick={() => this.toggleCreateAccount(true)} className="login-hide-form">CLOSE</span>
						</form>

					</div>
			)

		const manualForm = (
					<div className="login-account__overlay">
						<form onSubmit={(e) => this.handleSubmit(e)} className="login-manual-account__form">
							<h1>Login</h1>
							<label className="login-create-account__label" htmlFor="userEmail">Email</label>
							<input required className="login-manual-account__input" value={this.state.userEmail} onChange={e => this.handleChange(e)} name="userEmail" type="email" placeholder="email"/>
							<label className="login-create-account__label" htmlFor="userPassword">Password<br/><span onClick={() => this.togglePasswordVisibility()} id="password-visibility">Show/Hide</span></label>
							<input required id="login-existing-password" className="login-manual-account__input"  value={this.state.userPassword} onChange={e => this.handleChange(e)} name="userPassword" type="password" placeholder="password"/>
							<button onSubmit={(e) => this.handleSubmit(e)}className="login-manual-account__button">Login</button>
							<span onClick={() => this.toggleManualLogin(true)} className="login-hide-form">CLOSE</span>
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
