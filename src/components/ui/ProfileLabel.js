import React from 'react';
import PropTypes from 'prop-types';

const ProfileLabel = (props) => {
	const { name, text } = props;



	return (
		<label onClick={props.onClickFunc ? () => props.onClickFunc() : null} className="profile-label" htmlFor={name}>{text}</label>
	)
}

export default ProfileLabel;
