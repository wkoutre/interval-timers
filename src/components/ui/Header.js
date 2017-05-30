import React from 'react';
import { Link } from 'react-router-dom'
import base from '../Base'
import ConfirmLogout from '../containers/ConConfirmLogout'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggingOut: false
		}
	}

	// to bring up the overlay logout confirmation prompt
	localLogOut = () => {
		const isLoggingOut = true;
		this.setState({ isLoggingOut });
	}

	cancelLogout = () => {
		this.setState({ isLoggingOut: false })
	}

	render() {
		return (
			<header className="header">
				<h4 
					className="header-logout-button header-link"
					onClick={() => this.localLogOut()}>
						Logout
				</h4>
				{ this.state.isLoggingOut && <ConfirmLogout changeLogin={this.props.changeLogin} cancelLogout={this.cancelLogout}/> }
			</header>
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
