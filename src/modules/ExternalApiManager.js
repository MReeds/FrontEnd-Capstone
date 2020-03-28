import apiToken from "./ApiKey";

const externalApiUrl = "https://api.esv.org/v3/passage/search/"

export default {
  getAll() {
    return fetch(`${externalApiUrl}?q=rabble`, {
      headers: {
        Authorization: `${apiToken}`,
      }
    }).then(results => results.json());
  }
};
// esvApi.getAll().then(console.log)