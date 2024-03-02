const AuthAPI = require('./apis/authAPI');
const LocationAPI = require('./apis/locationAPI');

class Request {
    constructor() {
        this.location = new LocationAPI();
        this.auth = new AuthAPI();
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
module.exports = new Request();