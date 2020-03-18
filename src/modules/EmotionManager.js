const remoteUrl = "http://localhost:5000";

export default {
    getAll() {
        return fetch(`${remoteUrl}/emotions`).then(results => results.json());
    },
    getEmotion(id) {
        return fetch(`${remoteUrl}/verses/${id}?_expand=emotion`).then(results => results.json());
      }
}