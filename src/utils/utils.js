import { ShortFilmDuration } from "./constants";

function formatTime(timeInMinutes) {
  const mins = timeInMinutes % 60;
  const hours = (timeInMinutes - mins) / 60;

  return `${hours}ч ${mins}м`;
}

function filterMovies(movies, savedMovies, searchText, isShorted) {
  return movies.filter((movie) => {
    if (isShorted && movie.duration > 40) {
      return false;
    }

    if (searchText !== "") {
      const str = `${movie.nameRU} ${movie.nameEN} ${movie.description}`;

      if (!str.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }
    }

    const mapArray = getMap(savedMovies);

    const filteredMovie = mapArray.every((map) => {
      const idsArr = map.split(" ");
      if (movie.id.toString() === idsArr[1].toString()) {
        movie.savedMovie = idsArr[0];
        return false;
      }

      return true;
    });

    if (filteredMovie) {
      movie.savedMovie = "";
    }

    return true;
  });
}

function filterSavedMovies(savedMovies, searchText, isShorted) {
  return savedMovies.filter((movie) => {
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
  filterMovies,
  filterSavedMovies
};
