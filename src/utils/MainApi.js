class MainApi {
  constructor() {
    //this._baseUrl = "https://api.solodov-dplm.students.nomoredomains.xyz";
    this._baseUrl = "http://localhost:3000";
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

  login() {

  }
}

const mainApi = new MainApi();

export { mainApi };
