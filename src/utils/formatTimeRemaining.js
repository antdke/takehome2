/**
 * Calculates the time remaining from the given time elapsed.
 * @param {number} timeElapsed - The time elapsed in hours.
 * @returns {string} - The formatted string representing the time remaining.
 */
function formatTimeRemaining(timeElapsed) {
  const totalHours = 48;
  const timeRemaining = totalHours - timeElapsed;

  if (timeRemaining <= 0) {
    return "0 hours left";
  }

  const hours = Math.floor(timeRemaining);
  const minutes = Math.round((timeRemaining - hours) * 60);

  if (hours === 0) {
    return `${minutes} minutes left`;
  }

  return `${hours} hours left`;
}

export default formatTimeRemaining;
