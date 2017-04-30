import React from 'react';
import { Link } from 'react-router-dom'
import * as timeFuncs from '../../timeHelpers';

const SavedTimers = (props) => {
	// timers is an array of objects
	const { timers, editTimer, deleteTimer, chooseTimer } = props;

	// converting all values from timer to ms to pass into store

	const localChooseTimer = ({ numIntervals, intervalTime, restTime, timerName, restIncrement }) => {
		intervalTime = timeFuncs.minToMs(intervalTime);
		restTime = timeFuncs.secToMs(restTime);
		restIncrement = timeFuncs.secToMs(restIncrement);

		const obj = {
			intervalTime,
			restTime,
			numIntervals,
			timerName,
			restIncrement
		}

		return chooseTimer(obj);
	}

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
					<Link to="/run-timer">
						<span
							onClick={() => localChooseTimer(timers[i])}
							className="start-timer">start</span>
					</Link>
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
