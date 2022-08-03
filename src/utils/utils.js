import { ShortFilmDuration } from "./constants";

function formatTime(timeInMinutes) {
  const mins = timeInMinutes % 60;
  const hours = (timeInMinutes - mins) / 60;

  return `${hours}ч ${mins}м`;
}

function markSavedMovies(movies, mapArray) {
  movies.forEach((movie) => {
    mapArray.forEach((map) => {
      const idsArr = map.split(" ");

      if (movie.id.toString() === idsArr[1].toString()) {
        movie.savedMovie = idsArr[0];
      }
    });
  });
}

function filterSearch(movies, searchText, isShorted) {
  return movies.filter((movie) => {
    if (isShorted && movie.duration > ShortFilmDuration) {
      return false;
    }

    if (searchText !== "") {
      const str = `${movie.nameRU} ${movie.nameEN} ${movie.description}`;

      if (!str.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

function getMap(savedMovie) {
  const mapArray = [];
  let i = 0;

  savedMovie.forEach((movie) => {
    mapArray[i] = movie._id + " " + movie.movieId;
    i++;
  });

  return mapArray;
}

export {
  formatTime,
  markSavedMovies,
  filterSearch,
  getMap,
};
