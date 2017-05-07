import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'
import { store } from '../../store/store'
import { push } from 'connected-react-router'

class Header extends React.Component {
	componentWillMount() {
				
		if (!this.props.loggedIn) {
			console.log('Returning to LOGIN screen from HEADER');
			this.props.push('/');
		}
	}

	localLogOut = () => {
		console.log('local logout');
		console.log('before unauth');
		console.log(base.getAuth());
		base.auth().signOut();
		this.props.logout()
	}

	componentWillUnmount() {
		if (this.props.loggedIn) {

		}
	}

	render() {
		return (
			<div className="header">
				<button 
					className="logout-button"
					onClick={() => this.localLogOut()}>Logout</button>
				<button
					className="profile-button"
					onClick={() => console.log('Go To Profile')}>
						Profile
				</button>
				<button
					className="settings-button"
					onClick={() => console.log('Go To Settings')}>
						Settings
				</button>
				{this.props.children}
			</div>
		)
	}
}

export default Header;

/*
		NEED:
			1) OAuth for login
				a. If not logged, only show login screen
			2) Weight is automatically populated from server;
				if user changes it at anytime in a given day, it's changed on the server
				and the last value on any given day is what's saved (either from server input or manual)
			3) Weight goal - see #2
*/
