import React from 'react';

const SavedTimers = (props) => {
	// timers is an array of objects
	const { timers, editTimer, deleteTimer, startTimer } = props;

	let timerNames = timers.map( (obj, i) => 
		(
			<li key={i}>
				<span className="saved-timers">{obj.timerName}</span>&nbsp;
				<span
					onClick={() => editTimer(timers[i])}
					className="edit-timer">edit</span>
					&nbsp;
					<span
					onClick={() => deleteTimer(timers[i])}
					className="delete-timer">delete</span>
					&nbsp;
					<span
					onClick={() => {
							console.log("TODO: change to actual timer page");
							startTimer(timers[i])
						}
					}
					className="start-timer">start</span>
			</li>
		)
	);

	return (
		<div className="saved-timers">
			<h2>Saved Timers</h2>
			<ul>
				{timerNames}
			</ul>
			<div className="line-across"></div>
		</div>
	)
}

export default SavedTimers;
