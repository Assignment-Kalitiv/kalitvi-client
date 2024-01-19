export default class Connection {

    #url

    constructor(url) {
        this.#url = url;
    }

    async login(userData) {
        const response = await fetch(this.#url + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: "include"
        });
        return response
    }

    async register(userData) {
        const response = await fetch(this.#url + '/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return response
    }

    async logout() {

    }

    async getUsers() {
        const response = await fetch(this.#url + '/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydGVtLnZvbGtvdkBhYmMuY28uaWwiLCJpZCI6MiwiaWF0IjoxNzA1Njc1OTI4fQ.cat6WWj98lxd1KIXl3WXKYvztqrgoAKFvUNFdwmhPys'
            },
            credentials: "include"
        });
        return response
    }

    async editUser(id, firstname, lastname) {
        const response = await fetch(this.#url + '/api/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydGVtLnZvbGtvdkBhYmMuY28uaWwiLCJpZCI6MiwiaWF0IjoxNzA1Njc1OTI4fQ.cat6WWj98lxd1KIXl3WXKYvztqrgoAKFvUNFdwmhPys'
            },
            body: JSON.stringify({ firstname, lastname })
        });
        return response
    }

}