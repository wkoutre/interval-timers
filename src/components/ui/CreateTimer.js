import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from '../containers/ConSavedTimers'
import * as timeFuncs from '../../timeHelpers'

class CreateTimer extends React.Component {
	constructor(props) {
		super(props);
	}

	totalTimeCalc = () => {
		let { numIntervals, intervalTime, restTime, restIncrement } = this.props;

		restTime = restTime ? restTime : 0;
		intervalTime = intervalTime ? intervalTime : 0;
		restIncrement = restIncrement ? restIncrement : 0;

		// all values in minutes
		const intervalMins = (numIntervals * intervalTime);
		const restIncrementTime = timeFuncs.addedIncrementTime(restIncrement, (numIntervals - 1)) / 60;
		const restMins = (restTime / 60) * (numIntervals - 1) + restIncrementTime;
		const total = intervalMins + restMins;

		const totalMins = Math.floor(total/1);
		const totalSeconds = ((total - totalMins) * 60).toFixed(0);
		
		return `${totalMins} ${this.minuteCalc(totalMins)}, ${totalSeconds} ${this.secondCalc(totalSeconds)}`;
	}

	localSaveTimer = (e, goToTimers) => {
	
		e.preventDefault();

		const { saveTimer, clearTimerForm, timerName, numIntervals, intervalTime, restTime, restIncrement } = this.props;

		const totalTime = timeFuncs.calcTotalTime(numIntervals, intervalTime, restIncrement, restTime);
		const timeCreated = new Date().getTime();

		const timerObj = {
			timerName,
			numIntervals,
			intervalTime,
			restTime,
			restIncrement,
			totalTime,
			timeCreated
		}

		saveTimer(timerObj);
		clearTimerForm();
		goToTimers && this.props.push('saved-timers')
	}

	resetToDefaults = () => {
		const { defaultRestIncrement, defaultRestTime, defaultNumIntervals, defaultIntervalTime, setTimerName, setNumIntervals, setRestIncrement, setIntervalTime, setRestTime } = this.props;
		const arr = ["", defaultRestIncrement, defaultRestTime, defaultNumIntervals, defaultIntervalTime];

		const functions = [setTimerName, setRestIncrement, setRestTime, setNumIntervals, setIntervalTime];

		for (let i in arr) {
			const val = arr[i];
			functions[i](val)
		}
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
						intervalTime === '0.00' ||
						!timerName ||
						timers.filter(objs => objs.timerName === timerName).length > 0
					)
	}

	render() {
		const { intervalTime, numIntervals, restIncrement, restTime, timerName, timers, setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement, defaultIntervalTime, defaultNumIntervals, defaultRestIncrement, defaultRestTime } = this.props;		  

		return (
			<div className="app-create-timer">
				<form required className="create-timer-form">
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">New Timer Name:*</span> </span>
						<input
									className="create-timer-input"
									required type="text"
									placeholder="timer name"
									value={timerName}
									onChange={(e) => setTimerName(e.target.value || "")}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"><span className="create-timer-label-text">Number of Intervals:*</span> </span>
						<input
									className="create-timer-input"
									required type="number"
									placeholder="number of intervals"
									value={numIntervals}
									onChange={(e) => setNumIntervals(e.target.value || 0)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"><span className="create-timer-label-text">Interval Time:* (secs) </span></span>
						<input
								className="create-timer-input"
								required type="number"
								placeholder="interval time"
								value={intervalTime}
								onChange={(e) => setIntervalTime(parseFloat(e.target.value) || 0)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">Rest Time: (secs)</span></span>
						<input
								className="create-timer-input"
								required type="number"
								placeholder="rest time"
								value={restTime}
								onChange={(e) => setRestTime(e.target.value || 0)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">Added Rest Per <span className="question-mark">(?)</span>   Set (secs):</span>							
						</span>
						<input
								className="create-timer-input"
								type="number"
								placeholder="rest increment per set"
								value={restIncrement !== 0 ? restIncrement : ""}
								onChange={(e) => setRestIncrement(e.target.value || 0)}/>
					</div>
					<div className="create-timer__total-time create-timer-form-section">
						<h3>Total time: </h3>
						<span className="total-time-span">
							{this.totalTimeCalc()}
						</span>
					</div>
					<button
						type="submit"
						className="create-timer-button create-timer-button__add"
						disabled={this.canSubmit()}
						onClick={(e) => this.localSaveTimer(e, true)}>SAVE / GO TO TIMERS
					</button>
					<button
						className="create-timer-button create-timer-button__add"
						disabled={this.canSubmit()}
						onClick={(e) => this.localSaveTimer(e, false)}>SAVE / ADD ANOTHER
					</button>
					<button
						className="create-timer-button"
						onClick={() => this.resetToDefaults()}>SET TO DEFAULTS
					</button>
					<button
						className="create-timer-button"
						onClick={() => this.props.clearTimerForm()}>CLEAR TIMER
					</button>
				</form>

		</div>
		)
	}
}

export default CreateTimer;

// {this.props.timers.length > 0 && <SavedTimers />}

// <span>&nbsp;{this.interval()}</span>
// <span>&nbsp;{this.minutes()}</span>
// <span>&nbsp;{this.restSeconds()}</span>
// <span>&nbsp;{this.restIncrement()}</span>








