import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import base from '../Base'
import { store } from '../../store/store'
import { push } from 'connected-react-router'

class Header extends React.Component {
	// componentWillMount() {
				
	// 	if (!this.props.loggedIn) {
	// 		console.log('Returning to LOGIN screen from HEADER');
	// 		this.props.push('/');
	// 	}
	// }

	localLogOut = () => {
		console.log('local logout');
		console.log(base.getAuth());
		base.auth().signOut();
		this.props.logout()
	}

	render() {
		return (
			<div className="header">
				<Link 
					className="logout-button"
					onClick={() => this.localLogOut()}
					to='/'>
						Logout
				</Link>
				<Link
					className="profile-button header-link"
					to="home">
						Home
				</Link>
				<Link
					className="profile-button header-link"
					to="profile">
						Profile
				</Link>
				<Link
					className="settings-button header-link"
					to="settings">
						Settings
				</Link>
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
