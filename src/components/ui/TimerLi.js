import React from 'react';
import PropTypes from 'prop-types';

const TimerLi = (props) => {

	const { numIntervals, restTime, intervalTime, restIncrement, totalTime } = props.timerObj;
	
	const spans = Object.keys(props.timerObj).map( (key, i) => {
		return (
			<span className={`saved-timers__info-value saved-timers__info-${props.timerObj[key]} `}>{props.timerObj[key]}</span>
		)
	})

	return (
		<li className="saved-timers__li">
			{spans}
		</li>
	)
}

export default TimerLi;
