import { ShortFilmDuration } from "./constants";

function formatTime(timeInMinutes) {
  const mins = timeInMinutes % 60;
  const hours = (timeInMinutes - mins) / 60;

  return `${hours}ч ${mins}м`;
}

function markSavedMovies(movies, savedMovies) {
  const mapArray = getMap(savedMovies);

  movies.every((movie) => {
    if (mapArray[movie.id] === undefined) {
      movie.savedMovie = "";
    } else {
      movie.savedMovie = mapArray[movie.id];
    }

    return true;
  });
  return movies;
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

function getMap(savedMovies) {
  const mapArray = [];

  savedMovies.forEach((movie) => {
    mapArray[movie.movieId] = movie._id;
  });

  return mapArray;
}

export {
  formatTime,
  markSavedMovies,
  filterSearch,
  getMap,
};
