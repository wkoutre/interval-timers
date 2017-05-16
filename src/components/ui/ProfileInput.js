import React from 'react';
import PropTypes from 'prop-types';

const ProfileInput = (props) => {
	const { name, type, handleChange } = props;

	return (
		<input required={props.required} className="profile-input" value={props.value} type={type} name={name} onChange={(e) => handleChange(e, name)}/>
	)
}

export default ProfileInput;
