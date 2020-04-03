const remoteUrl = "http://localhost:5000";

export default {
  get(resource, id) {
    return fetch(`${remoteUrl}/${resource}/${id}`).then(results => results.json());
  },
  getWithComments(resource) {
    return fetch(`${remoteUrl}/${resource}?_expand=verse`).then(results => results.json());
  },
  getRandomId(resource) {
    return fetch(`${remoteUrl}/${resource}`)
    .then(results => results.json())
    .then(verses => {
      const randomIndex = Math.floor(Math.random() * verses.length);
      const randomVerse = verses[randomIndex];
      return randomVerse.id;
    });
  },
  getAll(resource) {
    return fetch(`${remoteUrl}/${resource}`).then(results => results.json());
  },
  delete(resource, verseId) {
    return fetch(`${remoteUrl}/${resource}/${verseId}`, {
      method: "DELETE"
    }).then(data => data.json());
  },
  post(resource, newVerse) {
    return fetch(`${remoteUrl}/${resource}?_expand=${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newVerse)
    }).then(data => data.json());
  },
  update(resource, editedVerse) {
    return fetch(`${remoteUrl}/${resource}/${editedVerse.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedVerse)
    }).then(data => data.json())
  }
};
