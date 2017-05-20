import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as colors from '../../css/colors'

// This is my own version of "activeClassName" for the react-redux-router being used in this project

const HeaderLink = (props) => {
	let customClass = props.classname;

	const style = {
		"textDecoration": "none",
	}

	const activeStyle = {
		"textDecoration": "none",
		"color": colors.white,
		"backgroundColor": colors.black3
	}

	const currLink = props.to === props.pathname;

	return <Link style={currLink ? activeStyle : style} to={props.to} className={customClass}>{props.children}</Link>
}

export default HeaderLink;
