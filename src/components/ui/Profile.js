import React from 'react';
import PropTypes from 'prop-types';

export const Profile = (props) => {
	
	return (
		<div className="profile">
			<div className="profile-name">
				<span>{props.fullName}</span>
			</div>
			<div className="profile-email">
				<span>{props.email}</span>			
			</div>
			<div className="profile-photo">
				<img src={props.photoURL} alt={`${props.fullname} profile picture`}/>
			</div>
			<div className="profile-dob">
				<span>June 14, 1992</span>
			</div>
			<div className="profile-location">
				<span>Fremont, CA</span>
			</div>
			<div className="profile-weight">
				<span>155</span>
			</div>
		</div>
	)
}
