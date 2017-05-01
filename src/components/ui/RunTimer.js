import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'

const RunTimer = ({ timerName, intervalTime, numIntervals, completedIntervals, restIncrement, restTime, totalTime, intervalTimer, restTimer, totalTimer }) => {

	const runTimer = () => {
		console.log("2", intervalTimer);
		
		intervalTimer.start();
	}

	const stopTimer = () => {
		intervalTimer.stop();
	}

	const { msToMinutes, msToSeconds } = timeFuncs;

	const totalMinRemaining = () => {
		return Math.floor(timeFuncs.msToMinutes(totalTimer.ms));
	}

	const totalSecRemaining = () => {
		const minutes = timeFuncs.msToMinutes(totalTimer.ms);
		const minFloor = Math.floor(minutes);

		return Math.ceil((minutes - minFloor) * 60);
	}

	const minElapsed = () => {
		const diff = totalTime - totalTimer.ms; // ms difference

		return timeFuncs.msToMinutes(diff);
	}

	const secElapsed = () => {
		const mins = timeFuncs.msToMinutes(totalTime - totalTimer.ms);
		const minsFloor = Math.floor(mins);

		return Math.ceil((mins - minsFloor) * 60);
	}

	const intMins = () => {
		console.log("Interval Mins:", intervalTimer.ms);
		let ret = Math.floor(timeFuncs.msToMinutes(intervalTimer.ms));

		return ret;
	}

	const intSecs = () => {
		let mins = timeFuncs.msToMinutes(intervalTimer.ms);
		let floor = Math.floor(mins);
		let ret = Math.ceil((mins - floor) * 60);

		return ret;
	}

	return (
		<div>
			<h1>{timerName}</h1>
			<div className="timer-totals">
				<h2>Timer Totals</h2>
				<ul>
					<li>Interval Time: {msToMinutes(intervalTime)} minutes</li>
					<li>Total Intervals: {numIntervals} intervals</li>
					<li>Rest Time: {msToSeconds(restTime)} seconds</li>
					{restIncrement !== 0 && <li>Rest Increment: {msToSeconds(restIncrement)} seconds</li>}
				</ul>
			</div>
			<div className="timer">
				<button onClick={() => runTimer()}>Start</button>
				<button onClick={() => stopTimer()}>Stop</button>
			</div>
			<div>
			<p>Interval: {completedIntervals} / {numIntervals}</p>
			<p>Time Remaining in Interval: {intMins()} minutes {intSecs()} seconds</p>
			<p>Total Time Elapsed: {minElapsed()} minutes {secElapsed()} seconds</p>
			<p>Total time remaining: {totalMinRemaining()} minutes, {totalSecRemaining()} seconds</p>
			</div>
		</div>
	)
}

export default RunTimer;
