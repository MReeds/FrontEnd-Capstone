// const esvApi = {
//   getAll() {
//     return fetch("https://api.esv.org/v3/passage/search/?q=rabble", {
//       headers: {
//         Authorization: "Token 0f66d1fa9d03729350b37c98f674ba55b8adabfc",
//       }
//     }).then(results => results.json());
//   }
// };
// esvApi.getAll().then(console.log)

const remoteUrl = "http://localhost:5000";

export default {
  get(id) {
    return fetch(`${remoteUrl}/verses/${id}`).then(results => results.json());
  },
  getAll() {
    return fetch(`${remoteUrl}/verses`).then(results => results.json());
  },
  post(newVerse) {
    return fetch(`${remoteUrl}/verses?_expand=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newVerse)
    }).then(data => data.json())
  }
}