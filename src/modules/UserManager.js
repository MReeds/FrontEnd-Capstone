const remoteUrl = "http://localhost:5000";

export default {
    get(id) {
        return fetch(`${remoteUrl}/users/${id}`).then(results => results.json());
    },
    getAll() {
        return fetch(`${remoteUrl}/users`).then(results => results.json());
    },
    post(newUser) {
        return fetch(`${remoteUrl}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json());
    }
}