export const msToHours = (ms) => msToMinutes(ms) / 60;
export const msToMinutes = (ms) => msToSeconds(ms) / 60;
export const msToSeconds = (ms) => ms / 1000;
export const secToMs = (sec) => sec * 1000;
export const minToMs = (min) => min * 60000;
export const twoPlacedFloat = (str) => parseFloat(str).toFixed(2);

export const addedIncrementTime = (restIncrement, numIntervals) => {

		if (!restIncrement)
			return 0;

		let total = 0;
		for (let i = 1; i < numIntervals; i++) {
			total += i * restIncrement;
		}

		// returns seconds
		
		return total;
	}

export const calcTotalTime = (numIntervals, intervalTime, restIncrement, restTime) => {

	const totalIntervalTime = minToMs((numIntervals * intervalTime));
	const totalRestIncrementTime = secToMs(addedIncrementTime(restIncrement, numIntervals));

	const totalRestTime = secToMs(restTime) * numIntervals;

	return totalIntervalTime + totalRestIncrementTime + totalRestTime;
}

export const secondsToText = (seconds) => {
	const secs = Math.floor(seconds % 60);
	const mins = Math.floor(seconds / 60);

	return `${mins} min, ${secs} secs`
}

export const msToText = (ms) => {
	const secs = Math.floor((msToSeconds(ms)) % 60);
	const mins = Math.floor(msToMinutes(ms));

	return `${mins} min, ${secs} secs`
}

export const timeToStr = (hour, minute) => {

	let amPM = ""
	if (hour > 12) {
		hour = hour-12;
		amPM = "PM"
	} else {
		amPM = "AM"
		if (hour === 0)
			hour = 12;
	}

	return `at ${hour}:${minute} ${amPM}`
}
