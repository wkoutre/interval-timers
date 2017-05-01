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
