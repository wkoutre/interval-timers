import React from 'react';
import PropTypes from 'prop-types';

const ProfileInput = (props) => {
	const { name, text, } = props;

	return (
		<label htmlFor={name}>{text}</label>
	)
}

export default ProfileInput;
