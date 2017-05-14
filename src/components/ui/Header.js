import React from 'react';
import { Link } from 'react-router-dom'
import base from '../Base'
import { store } from '../../store/store'
import HeaderLink from '../containers/ConHeaderLink'

const Header = (props) => {
	const localLogOut = () => {
		console.log('local logout');
		console.log(base.getAuth());
		base.auth().signOut();
		props.logout()
	}

	// const { pathname } = props.history.location.slice(1);

	return (
			<header className="header">
				<HeaderLink
					classname="header-profile-button header-link"
					to="profile">
						Profile
				</HeaderLink>
				<HeaderLink
					classname="header-settings-button header-link"
					to="settings">
						Settings
				</HeaderLink>
				<Link 
					className="header-logout-button header-link"
					onClick={() => localLogOut()}
					to='/'>
						Logout
				</Link>
			</header>
		)
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
