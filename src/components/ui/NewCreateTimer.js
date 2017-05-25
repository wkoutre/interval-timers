import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from '../containers/ConSavedTimers'
import * as timeFuncs from '../../timeHelpers'

class CreateTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showExplanation: false,
			timerName: "",
			restSec: 0,
			restMin: 0,
			intSec: 0,
			intMin: 0,
			numIntervals: 0,
			restIncrement: 0
		}
	}

	componentWillMount() {
		const { timerName, restTime, intervalTime, restIncrement, numIntervals } = this.props;

		// console.log(`restTime`, restTime);
		
		const splitRest = timeFuncs.splitTimeFromMin(restTime/60)

		// console.log(`intervalTime`, intervalTime);
		
		const splitInt = timeFuncs.splitTimeFromMin(intervalTime)

		const { sec: restSec, min: restMin } = splitRest;
		const { sec: intSec, min: intMin } = splitInt;

		this.setState({ timerName: timerName || "",
		 restSec: restSec || 0, restMin: restMin || 0, intSec: intSec || 0, intMin: intMin || 0, restIncrement: restIncrement || 0, numIntervals: numIntervals || 0 })
	}

	totalTimeCalc = () => {
		let { restMin, restSec, intMin, intSec, numIntervals, restIncrement } = this.state;

		if (!numIntervals)
			return `Add some intervals`;

		let restTime = this.getRestTime();
		let intervalTime = this.getIntervalTime();
		
		restTime = restTime ? restTime : "";
		intervalTime = intervalTime ? intervalTime : "";
		restIncrement = restIncrement ? restIncrement : "";

		// all values in minutes
		const intervalMins = (numIntervals * intervalTime);
		const restIncrementTime = timeFuncs.addedIncrementTime(restIncrement, (numIntervals - 1)) / 60;
		const restMins = (restTime / 60) * (numIntervals) + restIncrementTime;
		const total = intervalMins + restMins;

		const totalMins = Math.floor(total/1);
		let totalSeconds = ((total - totalMins) * 60).toFixed(0);

		totalSeconds = totalSeconds < 0 ? 0 : totalSeconds;
		
		return `${totalMins} ${this.minuteCalc(totalMins)}, ${totalSeconds} ${this.secondCalc(totalSeconds)}`;
	}

	getRestTime = () => {
		const { restMin, restSec } = this.state;

		let time = +(restMin*60 + +restSec);

		return +(time.toFixed(5));
	}

	getIntervalTime = () => {
		const { intMin, intSec } = this.state;

		let time = +(intMin + intSec/60)

		return +(time.toFixed(5));
	}

	resetForm = () => {
		this.setState({
			showExplanation: false,
			timerName: "",
			restSec: 0,
			restMin: 0,
			intSec: 0,
			intMin: 0,
			numIntervals: 0,
			restIncrement: 0
		})
	}

	localSaveTimer = (e, goToTimers) => {
	
		e.preventDefault();

		const { saveTimer, clearTimerForm } = this.props;
		let { restSec, restMin, intMin, intSec, timerName, numIntervals, restIncrement } = this.state;

		const restTime = this.getRestTime()
		const intervalTime = this.getIntervalTime()
		const totalTime = Math.round(timeFuncs.calcTotalTime(numIntervals, intervalTime, restIncrement, restTime));

		restIncrement = !restIncrement ? 0 : restIncrement;

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
		this.resetForm();
		clearTimerForm()
		goToTimers && this.props.push('saved-timers')
	}

	resetToDefaults = () => {
		const { defaultRestIncrement: restIncrement, defaultRestMins: restMin, defaultRestSecs: restSec, defaultNumIntervals: numIntervals, defaultIntervalMins: intMin, defaultIntervalSecs: intSec } = this.props;

		console.log(`resetting to defaults`);
		
		this.setState({ restIncrement, restMin, restSec, numIntervals, intMin, intSec })
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

		const { timers } = this.props;
		const { numIntervals, timerName } = this.state;
		const intervalTime = this.getIntervalTime();
		
		return (
						!numIntervals ||
						!intervalTime ||
						intervalTime === '0.00' ||
						!timerName ||
						timers.filter(objs => objs.timerName === timerName).length > 0
					)
	}

	toggleExplanation = () => {
		let { showExplanation } = this.state;

		showExplanation = !showExplanation;

		this.setState({ showExplanation })
	}

	handleChange = (e) => {
		const stateProp = e.target.name;
		let val = e.target.value;

		if (stateProp !== "timerName")
			val = +val;
		
		if ((stateProp === "restSec" || stateProp === "intSec") && val > 59)
			val = 59;

		if ((stateProp === "restMin" || stateProp === "intMin") && val > 200)
			val = 200;
		
		this.setState({ [stateProp]: val})
	}

	render() {
		const { intervalTime, numIntervals, restIncrement, restTime, timerName, timers, setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement, defaultIntervalMins, defaultNumIntervals, defaultRestIncrement, defaultRestMins } = this.props;

		const explanation = (
			<div className="rest-increment-explanation-overlay">
				<div className="rest-increment-explanation">
					<h2>Rest Increment</h2>
					<p className="rest-increment-explanation-text">After each interval, the amount of seconds entered here will be added to the rest time.</p>
					<div className="rest-increment-explanation-example">
						<h2>Example</h2>
						<span>The timer has 5 intervals set with a 10 second rest and 2 second rest increment.
							<ul>
								<li>Rest after interval 1: 10 seconds</li>
								<li>Rest after interval 2: 12 seconds</li>
								<li>Rest after interval 3: 14 seconds</li>
							</ul>
						</span>
					</div>
					<span className="close-explanation" onClick={() => this.toggleExplanation()}>CLOSE</span>
				</div>
			</div>
		)

		return (
			<div className="app-create-timer">
				<h1 className="create-timer-heading">New Timer</h1>
				<form required className="create-timer-form">
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">New Timer Name:*</span> </span>
						<input
									className="create-timer-input"
									required type="text"
									placeholder="timer name"
									name="timerName"
									value={this.state.timerName}
									maxLength="40"
									onChange={(e) => this.handleChange(e)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"><span className="create-timer-label-text">Number of Intervals:*</span> </span>
						<input
									className="create-timer-input"
									required type="number"
									placeholder="number of intervals"
									max="99"
									name="numIntervals"
									value={this.state.numIntervals}
									onChange={(e) => this.handleChange(e)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">Interval Min</span></span>
						<input
								className="create-timer-input"
								required type="number"
								placeholder="interval min"
								max="200"
								name="intMin"
								value={this.state.intMin}
								onChange={(e) => this.handleChange(e)}/>
						<span className="create-timer-label"> <span className="create-timer-label-text">Interval Sec</span></span>
						<input
								className="create-timer-input"
								required type="number"
								placeholder="interval sec"
								max="59"
								name="intSec"
								value={this.state.intSec}
								onChange={(e) => this.handleChange(e)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">Rest Min</span></span>
						<input
								className="create-timer-input"
								required type="number"
								placeholder="rest min"
								max="200"
								name="restMin"
								value={this.state.restMin}
								onChange={(e) => this.handleChange(e)}/>
						<span className="create-timer-label"> <span className="create-timer-label-text">Rest Sec</span></span>
						<input
								className="create-timer-input"
								required type="number"
								placeholder="rest sec"
								max="59"
								name="restSec"
								value={this.state.restSec}
								onChange={(e) => this.handleChange(e)}/>
					</div>
					<div className="create-timer-form-section">
						<span className="create-timer-label"> <span className="create-timer-label-text">Added Rest Per Set (secs)
						:&nbsp;
						{ 
							this.state.showExplanation ?
								explanation :
								<span className="question-mark"
										onClick={() => this.toggleExplanation()}>(?)
								</span>
						}
						</span>							
						</span>
						<input
								className="create-timer-input"
								type="number"
								placeholder="rest increment per set"
								value={this.state.restIncrement}
								name="restIncrement"
								onChange={(e) => this.handleChange(e)}/>
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








