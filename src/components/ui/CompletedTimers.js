import React from 'react';
import PropTypes from 'prop-types';

const CompletedTimers = (props) => {
	const { completedTimers } = props;

	const timerList = Object.keys(completedTimers).map( (key, i) => {
		const timerName = completedTimers[key][0];
		const date = completedTimers[key][1];
		return (
			<div 
				className="completedTimer"
				key={`i-${key}`}>
				<ul>
					<li>{date}</li>
					<li>{timerName}</li>
					<button onClick={() => props.removeCompletedTimer(key)}>remove</button>
				</ul>
			</div>
			)
		});

	return timerList.length > 0 ?
		(
			<div>
			Completed Timers:
				{timerList}
			</div>	
		) :
		<h2>No completed timers. Get some work done!</h2>
}

export default CompletedTimers;
