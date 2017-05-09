export const capitalizeWord = (str) => {
	return str[0].toUpperCase().concat(str.slice(1));
}

const findUpper = str => {
	let upperIndexes = [];
	for (let i in str) {
		
		if (str[i].charCodeAt() >= 65 && str[i].charCodeAt() <= 90) {
			upperIndexes.push(+i);
		}
	}

	return upperIndexes;
}

export const camelCaseToWords = camel => {
	const upperIndexes = findUpper(camel);

	let changed = camel[0].toUpperCase();
	let start = 1;
	
	for (let i of upperIndexes) {
		
		changed += (camel.slice(start, i) + ' ');
		start = +i;
	}

	changed += camel.slice(start);

	return changed;
}
