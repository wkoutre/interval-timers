import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from './SavedTimers'

class CreateTimer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { clearForm } = this.props;

		clearForm();
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
		const restIncrementTime = this.addedIncrementTime() / 60;
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

	canSubmit = () => {
		const { intervalTime, numIntervals, timerName, timers } = this.props;

		return (
						!numIntervals ||
						!intervalTime ||
						!timerName ||
						timers.filter(objs => objs.timerName === timerName).length > 0
					)
	}

	render() {
		const { intervalTime, numIntervals, restIncrement, restTime, timerName, timers, setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement } = this.props;		  

		return (
			<div>
				{this.props.timers.length > 0 && <SavedTimers {...this.props}/>}
				<h2>Create New Timer</h2>
				<form required className="new-timer">
					<span className="form-label">Timer Name:* </span>
					<input
								required type="text"
								placeholder="timer name"
								value={timerName}
								onChange={(e) => setTimerName(e.target.value)}/>
					<span className="form-label">Number of Intervals:* </span>
					<input
								required type="number"
								placeholder="number of intervals"
								value={numIntervals}
								onChange={(e) => setNumIntervals(e.target.value)}/>
					<span>&nbsp;{this.interval()}</span>
					<span className="form-label">Interval Time:*</span>
					<input
								required type="number"
								placeholder="interval time"
								value={intervalTime}
								onChange={(e) => setIntervalTime(e.target.value)}/>
					<span>&nbsp;{this.minutes()}</span>
					<span className="form-label">Rest Time:</span>
					<input
								required type="number"
								placeholder="rest time"
								value={restTime}
								onChange={(e) => setRestTime(e.target.value)}/>
					<span>&nbsp;{this.restSeconds()}</span>
					<span className="form-label">Rest Increment Per Set:</span>
					<input type="number"
								placeholder="rest increment per set"
								value={restIncrement}
								onChange={(e) => setRestIncrement(e.target.value)}/>
				<span>&nbsp;{this.restIncrement()}</span>
				<button
					type="submit"
					className="save-timer"
					disabled={this.canSubmit()}
					onClick={(e) => this.localSaveTimer(e)}>
						SAVE
					</button>
				</form>
			<div className="total-time"><h2>Total time: </h2>{this.totalTimeCalc()}</div>
		</div>
		)
	}
}

export default CreateTimer;
