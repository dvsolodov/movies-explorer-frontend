class MoviesApi {
  constructor() {
    this._baseUrl = "https://api.nomoreparties.co/beatfilm-movies";
    this._headers = {
      "Content-Type": "application/json"
    };
  }

  getMovies() {
    return fetch(this._baseUrl, {
        method: "GET",
        headers: this._headers
      })
      .then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка запроса: ${response.status}`);
  }
}

const moviesApi = new MoviesApi();

export { moviesApi };
