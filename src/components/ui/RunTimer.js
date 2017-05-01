import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'

const RunTimer = ({ timerName, intervalTime, numIntervals, completedIntervals, restIncrement, restTime, totalTime, startTimer, stopTimer, incrementIntervals }) => {

	let intervalTimer = new Stopwatch(intervalTime),
		restTimer = new Stopwatch(restTimer),
		totalTimer = new Stopwatch(totalTime)

		// can still do setInterval chains... just do them with a controlled local React state!

	const runTimer = () => {

		if (intervalTimer.ms === 0 && completedIntervals < numIntervals) {
			intervalTimer = new Stopwatch(intervalTime);
		} else if (completedIntervals == numIntervals) {
			// Timer is complete!
			stopTimer()
			console.log('TODO: Make noise; option to restart, etc');
		}

		intervalTimer.startstop();

		startTimer(
			setInterval( () => {
					console.log("interval " + Math.ceil(timeFuncs.msToSeconds(intervalTimer.ms)));
					if (intervalTimer.ms === 0) {
						stopTimer()
						startRest()
						incrementIntervals();
					}
				}, 1000)
			)

		return ;
	}

	const startRest = () => {
		if (restTimer.ms === 0 && completedIntervals < numIntervals) {
			restTimer = new Stopwatch(restTime);
		}

		restTimer.startstop();
		startTimer(
			setInterval( () => {
					console.log("rest " + Math.ceil(timeFuncs.msToSeconds(restTimer.ms)));
					if (restTimer.ms === 0) {
						stopTimer()
						runTimer()
					}
				}, 1000)
		)

		return ;
	}

	const localStopTimer = () => {
		intervalTimer.startstop();
		restTimer.startstop();
		stopTimer();
	}

	const { msToMinutes, msToSeconds } = timeFuncs;

	const totalMinRemaining = (timer) => {
		return Math.floor(timeFuncs.msToMinutes(timer.ms));
	}

	const totalSecRemaining = (timer) => {
		const minutes = timeFuncs.msToMinutes(timer.ms);
		const minFloor = Math.floor(minutes);

		return Math.floor((minutes - minFloor) * 60);
	}

	const minElapsed = () => {
		const diff = totalTime - totalTimer.ms; // ms difference

		return timeFuncs.msToMinutes(diff);
	}

	const secElapsed = () => {
		const mins = timeFuncs.msToMinutes(totalTime - totalTimer.ms);
		const minsFloor = Math.floor(mins);

		return Math.floor((mins - minsFloor) * 60);
	}

	const intMins = () => {
		console.log("Interval Mins:", intervalTimer.ms);
		let ret = Math.floor(timeFuncs.msToMinutes(intervalTimer.ms));

		return ret;
	}

	const intSecs = () => {
		let mins = timeFuncs.msToMinutes(intervalTimer.ms);
		let floor = Math.floor(mins);
		let ret = Math.floor((mins - floor) * 60);

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
				<button onClick={() => localStopTimer()}>Stop</button>
			</div>
			<div>
			<p>Interval: {completedIntervals} / {numIntervals}</p>
			<p>Time Remaining in Interval: {intMins()} minutes {intSecs()} seconds</p>
			<p>Total Time Elapsed: {minElapsed()} minutes {secElapsed()} seconds</p>
			<p>Total time remaining: {totalMinRemaining(totalTimer)} minutes, {totalSecRemaining(totalTimer)} seconds</p>
			</div>
		</div>
	)
}

export default RunTimer;
