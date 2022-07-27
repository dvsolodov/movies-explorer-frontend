function formatTime(timeInMinutes) {
  const mins = timeInMinutes % 60;
  const hours = (timeInMinutes - mins) / 60;

  return `${hours}ч ${mins}м`;
}

function filterMoviesByTime(movies) {
  return movies.filter((movie) => {
    return movie.duration <= 40;
  });
}

function filterMoviesBySearchText(movies, searchText) {
  return movies.filter((movie) => {
    const str = `${movie.nameRU} ${movie.nameEN} ${movie.description}`;
    return str.toLowerCase().includes(searchText.toLowerCase());
  });
}

export {
  formatTime,
  filterMoviesByTime,
  filterMoviesBySearchText
};
