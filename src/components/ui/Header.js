import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'

class Header extends React.Component {
	componentWillMount() {
		console.log('HEADER: change loggedIn to this.props.loggedIn');
		
		if (!localStorage['workout-timer-uid']) {
			console.log('Returning to LOGIN screen from HEADER');
			this.props.history.push('/');
		}
	}

	localLogOut = () => {
		console.log('local logout');
		console.log('before unauth');
		console.log(base.getAuth());
		base.auth().signOut();
		this.props.logout()
		this.props.history.push('/');	
	}

	render() {
		return (
			<div className="header">
				<button 
					className="logout-button"
					onClick={() => this.localLogOut()}>LOGOUT</button>
				<input type="number" className="weight" placeholder="Today's weight"/>
				<input type="text" className="weight-goal" placeholder="Weight goal"/>
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
