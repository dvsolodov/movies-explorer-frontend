class MainApi {
  constructor() {
    this._baseUrl = "https://api.solodov-dplm.students.nomoredomains.xyz";
    this._headers = {
      "Content-Type": "application/json"
    };
  }

  register(formData) {
    return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name:formData.name,
          email:formData.email,
          password:formData.password
        })
      })
      .then((response) => response.json());
  }

  login(formData) {
    return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          email:formData.email,
          password:formData.password
        })
      })
      .then((response) => response.json());
  }

  getUserData(token) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((response) => response.json());
  }

  updateUser(token, data) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  getMovies(token) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers
    })
      .then((response) => response.json());
  }

  saveMovie(token, data) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((response) => response.json());
  }

  deleteMovie(token, movieId) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((response) => response.json());
  }

}


const mainApi = new MainApi();

export { mainApi };
