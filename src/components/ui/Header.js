import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
	const localLogOut = () => {
		console.log('local logout');
		
		
		props.logout();
		props.history.push('/');
		localStorage.removeItem('redux-timer-store');
	}
	return (
		<div className="header">
			<button 
				className="logout-button"
				onClick={() => localLogOut()}>LOGOUT</button>
			<input type="number" className="weight" placeholder="Today's weight"/>
			<input type="text" className="weight-goal" placeholder="Weight goal"/>
		</div>
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
