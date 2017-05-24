// a partially complete rewrite, in the case the original one proves unstable

import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'
import * as colors from '../../css/colors'

class RunTimer extends React.Component {
	constructor(props) {
		super(props);
		const { intervalTime, restIncrement, restTime, totalTime } = props;

		// everything in state is in milliseconds
		this.state = {
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime - restTime),
			intervalId: 0,
			intervalMs: intervalTime,
			restMs: restTime,
			active: "interval",
			timeRemaining: props.totalTime - props.restTime,
			running: false,
			can: "",
			go: new Audio(`${this.props.audio.go}`),
			rest: new Audio(`${this.props.audio.rest}`),
			complete: new Audio(`${this.props.audio.timerComplete}`)
		}
	}

	startTime = () => {
		this.state.totalTimer.start()
	}

	stopTime = () => {
		this.state.totalTimer.stop();
	}

	stopTimer = () => {

		this.stopTime();
		const { intervalId } = this.state;
		const running = false;
		clearInterval(intervalId);

		this.setState({ running })
	}

	toggleIntervalRest = () = {
		let { timeElapsed, timeRemaining, intervalMs, restMs } = {...this.state};

		if (timeRemaining <= 10) {
			this.endTimer();
		}

		timeElapsed = this.state.totalTimer._elapsedMS
		timeRemaining -= 10;

		this.setState({ timeElapsed, timeRemaining });

		if (this.state.active === 'interval') {
			intervalMs -= 10;
			if (intervalMs === 0){
				this.setState({ 
					intervalMs: this.props.intervalTime,
					active: 'rest'
				})
			} else {
				this.setState({ intervalMs })
			}
		} else {
			restMs -= 10;
			if (restMs === 0){
				this.setState({ 
					restMs: this.props.restTime,
					active: 'interval',
					completedIntervals: this.state.completedIntervals + 1
				})
			} else {
				this.setState({ restMs })
			}
		}
	}

	runTimer = () => {
		if (!this.state.running) {
			const running = true;
			const { totalTimer, intervalId } = this.state;

			const intervalId = setInterval(this.toggleIntervalRest, 10);

			this.setState({ running, intervalId })

			// if it's the first time runTimer has been called
			if (this.state.completedIntervals === 0){
				const completedIntervals = 1;
				this.setState({ completedIntervals })
			}

			this.startTime();
		}
	}

	stopTimer = () => {
		const { totalId, totalTimer } = this.state;
		clearInterval(totalId);
		this.setState({ running: false, intervalMs: this.state.intervalMs - 25 })	
		totalTimer.stop()
	}

	pixelRatio = () => {
		const ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
					ctx.mozBackingStorePixelRatio ||
					ctx.msBackingStorePixelRatio ||
					ctx.oBackingStorePixelRatio ||
					ctx.backingStorePixelRatio || 1;

		return (dpr / bsr);
	}

	render() {
		const { timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		incrementIntervals } = this.props;

		const { completedIntervals,
						intervalMs,
						restMs,
						timeElapsed,
						totalTimer,
						active,
						timeRemaining } = this.state;

		const w = window.innerWidth
		const { msToText } = timeFuncs;

		// const can = this.createHiDPIcan(200, 200);

		return (
			<div className="app-run-timer">
				<div className="run-timer__timer-totals">
					<h1>{timerName}</h1>
					<ul className="run-timer__timer-totals-ul">
						<li><span className="timer-totals__label">Total Intervals:</span> <span className="timer-totals__value">{numIntervals} intervals</span></li>
						<li><span className="timer-totals__label">Interval Time:</span> <span className="timer-totals__value">{msToText(intervalTime)}</span></li>						
						<li><span className="timer-totals__label">Rest Time:</span> <span className="timer-totals__value">{msToText(restTime)}</span></li>
						{restIncrement !== 0 && <li>Rest Increment: {msToText(restIncrement)}</li>}
					</ul>
				</div>
				<canvas
					
					className="run-timer__timer-circle"
					id="timer-circle"
					onClick={() => !this.state.running && this.state.totalTimer.ms > 0 ? this.runTimer() : this.stopTimer()}
				></canvas>
				<div className="run-timer__timer-data">
					<p className="run-timer__timer-data-label">Time Elapsed: {msToText(totalTime-timeRemaining-restTime-1000)}</p>
					<p className="run-timer__timer-data-label">Time Remaining: {msToText(timeRemaining)}</p>
					<button className="run-timer__button run-timer__reset" onClick={() => this.resetTimers()}>Reset</button>
				</div>
			</div>
		)
	}
}

export default RunTimer;
