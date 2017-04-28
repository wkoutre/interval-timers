import React from 'react';

const SavedTimers = (props) => {
	// timers is an array of objects
	const { timers, editTimer } = props;

	let timerNames = timers.map( (obj, i) => <li key={i}>
		<span className="saved-timers">{obj.timerName}</span>&nbsp;
		<span
			onClick={() => editTimer(props.timers[i])}
			className="edit-timer">edit</span>
		</li>);

	return (
		<div>
			<h2>Saved Timers</h2>
			<ul>
				{timerNames}
			</ul>
		</div>
	)
}

export default SavedTimers;
