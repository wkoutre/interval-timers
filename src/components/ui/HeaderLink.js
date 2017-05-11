import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const HeaderLink = (props) => {
	let customClass = props.classname;

	const style = {
		"textDecoration": "none",
		"color": "blue"
	}

	const activeStyle = {
		"textDecoration": "underline",
		"color": "green"
	}

	const currLink = props.to === props.pathname;

	return <Link style={currLink ? activeStyle : style} to={props.to} className={customClass}>{props.children}</Link>
}

export default HeaderLink;
