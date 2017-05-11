import React from 'react';
import PropTypes from 'prop-types';

const ProfileLabel = (props) => {
	const { name, text, } = props;

	return (
		<label className="profile-label" htmlFor={name}>{text}</label>
	)
}

export default ProfileLabel;
