import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CompletedTimers = (props) => {
	const { completedTimers } = props;

	const timerList = completedTimers.map( (timerObj, i) => {
		const { timerName, ms, dateString } = timerObj

		return (
				<ul key={`${ms}-${i}`} className="completed-timers__timer-ul">
					<li className="completed-timers__timer-name completed-timers__timer-li">{timerName}</li>
					<li className="completed-timers__timer-date completed-timers__timer-li">{dateString}</li>
					<button className="completed-timers__remove-button" onClick={() => props.removeCompletedTimer(i)}>remove</button>
				</ul>
			)
		});

	return timerList.length > 0 ?
		(
			<div className="app-completed-timers">
			<h1 className="completed-timers__completed-timers-heading">Completed Timers:</h1>
			<div className="completed-timers__div">
				{timerList}
			</div>
			</div>	
		) :
			<div className="app-completed-timers__none-heading-div">
				<h1 className="completed-timers__no-timers-heading">No completed timers.</h1>
				<h1 className = "completed-timers__no-timers-heading"> <Link className="completed-timers__no-timers-link" to='saved-timers'>Get some work done!</Link> </h1>
			</div>
		
}

export default CompletedTimers;

			// <div 
			// 	className="completed-timers__timer-div"
			// 	key={`i-${key}`}>
			// 	<ul className="completed-timers__timer-ul">
			// 		<li className="completed-timers__timer-name completed-timers__timer-li">{timerName}</li>
			// 		<li className="completed-timers__timer-date completed-timers__timer-li">{date}</li>
			// 		<button className="completed-timers__remove-button" onClick={() => props.removeCompletedTimer(key)}>remove</button>
			// 	</ul>
			// </div>
			// )
