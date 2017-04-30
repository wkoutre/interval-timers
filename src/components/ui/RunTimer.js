import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'

const RunTimer = ({ timerName, intervalTime, numIntervals, restIncrement, restTime }) => {
	let stop;

	const { msToMinutes, msToSeconds } = timeFuncs;

	const runTimer = () => {
			const timer = new Stopwatch(intervalTime);
			timer.start();
			stop = setInterval( () => console.log(`${Math.floor(msToMinutes(timer.ms))} minutes,
				${Math.round(msToSeconds(timer.ms))} seconds`), 1000)
	}

	const stopTimer = () => {
		clearInterval(stop);
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
		</div>
	)
}

export default RunTimer;
