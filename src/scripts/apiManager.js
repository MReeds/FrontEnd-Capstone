const esvApi = {
  getAll() {
    return fetch("https://api.esv.org/v3/passage/search/?q=rabble", {
      headers: {
        Authorization: "Token 0f66d1fa9d03729350b37c98f674ba55b8adabfc",
      }
    }).then(results => results.json());
  }
};
esvApi.getAll().then(console.log)

