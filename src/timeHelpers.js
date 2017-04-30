export const msToHours = ms => msToMinutes(ms) / 60;
export const msToMinutes = ms => msToSeconds(ms) / 60;
export const msToSeconds = ms => ms / 1000;
export const secToMs = sec => sec * 1000;
export const minToMs = min => min * 60000;
export const twoPlacedFloat = str => parseFloat(str).toFixed(2);
