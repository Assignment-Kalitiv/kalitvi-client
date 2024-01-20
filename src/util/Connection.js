export default class Connection {

    #url

    constructor(url) {
        this.#url = url;
    }

    async #fetchRequest(url, method, body) {
        return await fetch(this.#url + url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body,
            credentials: "include"
        })
    }

    async login(userData) {
        return await this.#fetchRequest('/api/login', 'POST', JSON.stringify(userData))
    }

    async register(userData) {
        return await this.#fetchRequest('/api/register', 'POST', JSON.stringify(userData))
    }

    async logout() {
        return await this.#fetchRequest('/api/logout', 'POST')
    }

    async getUsers() {
        return await this.#fetchRequest('/api/users', 'GET')
    }

    async editUser(id, firstname, lastname) {
        return await this.#fetchRequest('/api/users/' + id, 'PUT', JSON.stringify({ firstname, lastname }))
    }

    async deleteUser(id) {
        return await this.#fetchRequest('/api/users/' + id, 'DELETE')
    }

}