import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'

const ConfirmLogout = (props) => {

	const localLogout = () => {
		console.groupCollapsed('logout group');
			console.log('local logout');
			console.log(base.getAuth());	
		console.groupEnd('logout group');
		
		base.auth().signOut();
		props.logout()
		props.push('/')
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
