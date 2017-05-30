import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'

const ConfirmLogout = (props) => {

	const localLogout = () => {
		props.changeLogin(false);
		props.logout()
		setTimeout(base.unauth(), 1);
		
		localStorage.removeItem('workout-timer-uid');
		localStorage.removeItem('workout-timer-app');
		
	}

	return (
		<div className="confirm-logout__overlay">
			<div className="app-confirm-logout">
				<h3 className="confirm-logout__heading" >Are you sure you want to logout?</h3>
				<button 
					className="confirm-logout__yes confirm-logout__button"
					onClick={() => localLogout()}>
					Yes</button>
				<button
					className="confirm-logout__no confirm-logout__button"
					onClick={() => props.cancelLogout()}>No
				</button>
			</div>
		</div>
	)
}

export default ConfirmLogout;
