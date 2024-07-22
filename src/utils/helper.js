/**
 * Converts time in milliseconds to a formatted string in hours, minutes, and seconds.
 *
 * @param {number} ms - The time in milliseconds.
 * @returns {string} - The formatted time string in "H:MM:SS" format.
 */
export const convertMilliseconds = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  if (hours > 0) {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else {
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  }
};

export default { convertMilliseconds };
