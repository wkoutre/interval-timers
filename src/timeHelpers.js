export const msToSeconds = (ms) => (ms / 1000);
export const msToMinutes = (ms) => msToSeconds(ms) / 60;
export const msToHours = (ms) => msToMinutes(ms) / 60;
export const minToSec = (min) => min * 60;
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
	let secs = Math.ceil(seconds % 60);
	let mins = Math.floor(seconds / 60);

	// mins = mins < 9 ? '0' + parseInt(mins) : mins;
	secs = secs < 10 ? '0' + parseInt(secs) : secs;

	return `${mins}:${secs}`
}

export const minToText = (min) => {
	return secondsToText(minToSec(min))
}

export const msToText = (ms) => {
	
	if (ms < 0)
		ms = 0;
	const secs = Math.ceil((msToSeconds(ms)) % 60);
	let mins;
	if (ms > 59000)
		 mins = Math.ceil(msToMinutes(ms));
	else
		mins = 0;

	const secText = secs !== 1 ? 'secs' : 'sec'
	const minText = mins !== 1 ? 'mins' : 'min'

	if (mins === 0) {
		return `${secs} ${secText} `
	}

	return `${mins} ${minText} , ${secs} ${secText} `;
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

export const findAge = (dateFromInput) => {
	const year = +dateFromInput.slice(0, 4)
	const dateArr = dateFromInput.split('-');
	const month = +dateArr[1]
	const day = +dateArr[2]
	const present = new Date();
	const curYear = present.getFullYear();
	const curMonth = present.getMonth()+1;
	const curDay = present.getDate();
	let age = curYear - year - 1;
	
	if (curMonth === month && curDay >= day)
		age++;
	else if (curMonth > month)
		age++;

	return age;
}

export const intervalText = numIntervals => {
	const intervalText = numIntervals !== 1 ? 'intervals' : 'interval'

	return `${numIntervals} ${intervalText} `
}

export const restIncrementText = restIncrement => {
	const restIncrementText = restIncrement !== 1 ? 'secs' : 'sec'

	return `${restIncrement} ${restIncrementText} `
}

export const splitTimeFromMin = (mins) => {
	let floorMin, minMs, secMs;

	if (mins >= 1) {
		floorMin = Math.floor(mins);
		minMs = minToMs(floorMin)
		secMs = Math.round(minToMs(mins%floorMin))
	} else {
		minMs = 0
		secMs = Math.floor(minToMs(mins))
	}

	// console.log(`mins`, mins);
	// console.log(`minMs`, minMs);
	// console.log(`secMs`, secMs);
	
	let sec = Math.round(msToSeconds(secMs));
	let min = Math.round(msToMinutes(minMs));

	return {
		sec,
		min
	}
}

export const roundMsToThousand = (ms) => {
	if (ms % 1000 === 0)
		return ms;
	
}
