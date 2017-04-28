import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from './SavedTimers'

class Timer extends React.Component {
	constructor(props){
		super(props);
	}

	addedIncrementTime = () => {
		const { restIncrement, numIntervals } = this.props;
		if (!restIncrement)
			return 0;

		let total = 0;
		for (let i = 1; i < numIntervals; i++) {
			total += i * restIncrement;
		}

		// returns seconds
		return total;
	}

	totalTimeCalc = () => {
		let { numIntervals, intervalTime, restTime, restIncrement } = this.props;

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
		
		return `${totalMins} ${this.minuteCalc(totalMins)}, ${totalSeconds} ${this.secondCalc(totalSeconds)}`;
	}

	localSaveTimer = (e) => {
	
		e.preventDefault();

		const { saveTimer, clearForm, timerName, numIntervals, intervalTime, restTime, restIncrement } = this.props;
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

	minuteCalc = (val) => {
		return val == 1 ? "minute" : "minutes"
	}

	secondCalc = (val) => {
		return val == 1 ? "second" : "seconds"
	}

	interval = () => {
		return this.props.numIntervals == 1 ? " interval" : " intervals";
	}

	minutes = () => {
		return this.props.intervalTime != 1 ? " minutes" : " minute";
	}

	restSeconds = () => {
		return this.props.restTime != 1 ? " seconds" : " second";
	}

	restIncrement = () => {
		return this.props.restIncrement !== 1 ? " seconds" : " second";
	}
	render() {
		const { setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement } = this.props;

		return (
			<div>
				{this.props.timers.length > 0 && <SavedTimers {...this.props}/>}
				<h2>Create New Timer</h2>
				<form className="new-timer">
					<span className="form-label">Timer Name: </span>
					<input type="text"
								placeholder="timer name"
								onChange={(e) => setTimerName(e.value)}/>
					<span className="form-label">Number of Intervals: </span>
					<input type="number"
								placeholder="number of intervals"
								ref={input => _numIntervals=input}
								onChange={(e) => setNumIntervals(e.value)}/>
					<span>{interval()}</span>
					<span className="form-label">Interval Time:</span>
					<input type="number"
								placeholder="interval time"
								ref={input => _intervalTime=input}
								onChange={(e) => setIntervalTime(e.value)}/>
					<span>{minutes()}</span>
					<span className="form-label">Rest Time:</span>
					<input type="number"
								placeholder="rest time"
								ref={input => _restTime=input}
								onChange={(e) => setRestTime(e.value)}/>
					<span>{restSeconds()}</span>
					<span className="form-label">Rest Increment Per Set:</span>
					<input type="number"
								placeholder="rest increment per set"
								ref={input => _restIncrement=input}
								onChange={(e) => setRestIncrement(e.value)}/>
				<span>{restIncrement()}</span>
				<input
					type="submit"
					onClick={(e) => this.localSaveTimer(e)}/>
				</form>
				<div className="total-time"><h2>Total time: </h2>{this.totalTimeCalc()}</div>
			</div>
		)	
	}	
}

export default Timer;
