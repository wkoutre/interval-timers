import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from './SavedTimers'

const Timer = (props) => {
	const { setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement } = props;

	let _numIntervals,
		_intervalTime,
		_restTime,
		_restIncrement,
		_timerName;

	const addedIncrementTime = () => {
		const { restIncrement, numIntervals } = props;
		if (!restIncrement)
			return 0;

		let total = 0;
		for (let i = 1; i < numIntervals; i++) {
			total += i * restIncrement;
		}

		// returns seconds
		return total;
	}

	const totalTimeCalc = () => {
		let { numIntervals, intervalTime, restTime, restIncrement } = props;

		restTime = restTime ? restTime : 0;
		intervalTime = intervalTime ? intervalTime : 0;
		restIncrement = restIncrement ? restIncrement : 0;

		// all values in minutes
		const intervalMins = (numIntervals * intervalTime);
		const restIncrementTime = addedIncrementTime() / 60;
		const restMins = (restTime / 60) * numIntervals + restIncrementTime;
		const total = intervalMins + restMins;

		const totalMins = Math.floor(total/1);
		const totalSeconds = ((total - totalMins) * 60).toFixed(0);
		
		return `${totalMins} ${minuteCalc(totalMins)}, ${totalSeconds} ${secondCalc(totalSeconds)}`;
	}

	const localSaveTimer = (e) => {
	
		e.preventDefault();

		const valuesArray = [_numIntervals, _intervalTime, _restTime, _restIncrement, _timerName];
		const { saveTimer, clearForm, timerName, numIntervals, intervalTime, restTime, restIncrement } = props;
		const timerObj = {
			timerName,
			numIntervals,
			intervalTime,
			restTime,
			restIncrement
		}

		saveTimer(timerObj);
		clearForm();
		valuesArray.map(item => item.value = "")		
	}

	const minuteCalc = (val) => {
		return val == 1 ? "minute" : "minutes"
	}

	const secondCalc = (val) => {
		return val == 1 ? "second" : "seconds"
	}

	const interval = () => {
		return props.numIntervals == 1 ? " interval" : " intervals";
	}

	const minutes = () => {
		return props.intervalTime != 1 ? " minutes" : " minute";
	}

	const restSeconds = () => {
		return props.restTime != 1 ? " seconds" : " second";
	}

	const restIncrement = () => {
		return props.restIncrement !== 1 ? " seconds" : " second";
	}

	return (
		<div>
			{props.timers.length > 0 && <SavedTimers {...props}/>}
			<h2>Create New Timer</h2>
			<form className="new-timer">
				<span className="form-label">Timer Name: </span>
				<input type="text"
							placeholder="timer name"
							ref={input => _timerName=input}
							onChange={() => setTimerName(_timerName.value)}/>
				<span className="form-label">Number of Intervals: </span>
				<input type="number"
							placeholder="number of intervals"
							ref={input => _numIntervals=input}
							onChange={() => setNumIntervals(_numIntervals.value)}/>
				<span>{interval()}</span>
				<span className="form-label">Interval Time:</span>
				<input type="number"
							placeholder="interval time"
							ref={input => _intervalTime=input}
							onChange={() => setIntervalTime(_intervalTime.value)}/>
				<span>{minutes()}</span>
				<span className="form-label">Rest Time:</span>
				<input type="number"
							placeholder="rest time"
							ref={input => _restTime=input}
							onChange={() => setRestTime(_restTime.value)}/>
				<span>{restSeconds()}</span>
				<span className="form-label">Rest Increment Per Set:</span>
				<input type="number"
							placeholder="rest increment per set"
							ref={input => _restIncrement=input}
							onChange={() => setRestIncrement(_restIncrement.value)}/>
			<span>{restIncrement()}</span>
			<input
				type="submit"
				onClick={(e) => localSaveTimer(e)}/>
			</form>
			<div className="total-time"><h2>Total time: </h2>{totalTimeCalc()}</div>
		</div>
	)
}

export default Timer;
