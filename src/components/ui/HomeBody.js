import React from 'react';
import PropTypes from 'prop-types';

const HomeBody = (props) => {
	return (
		<div>
			<h1>DASHBOARD</h1>
			<div>
				<span className="today-workout">Today's workout: ____</span>
			</div>
			<div className="progress-bars">
				<p className="progress">Progress 1</p>
				<p className="progress">Progress 2</p>
				<p className="progress">Progress 3</p>
				<p className="progress">Progress 4</p>
			</div>
		</div>
	)
}

export default HomeBody;
