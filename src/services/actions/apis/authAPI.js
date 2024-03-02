const axios = require('../axios'); // use the axios instance

class AuthAPI {
    registerUser(params) {
        return axios.post('/users/createuser', params);
    }

    loginUser(params) {
        return axios.post('/users/loginuser', params);
    }
}

module.exports = AuthAPI;