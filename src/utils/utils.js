function formatTime(timeInMinutes) {
  const mins = timeInMinutes % 60;
  const hours = (timeInMinutes - mins) / 60;

  return `${hours}ч ${mins}м`;
}

export {
  formatTime
};
