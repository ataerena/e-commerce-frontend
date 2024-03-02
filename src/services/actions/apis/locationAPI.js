const axios = require("axios");

class LocationAPI {
    static endpoint = "https://countriesnow.space";

    async getCountries() {
        return axios.get(`${LocationAPI.endpoint}/api/v0.1/countries/positions`, { withCredentials: false });
    }

    async getCities(params) {
        return axios.post(`${LocationAPI.endpoint}/api/v0.1/countries/states`, params, { withCredentials: false });
    }

    async getDistricts(params) {
        return axios.post(`${LocationAPI.endpoint}/api/v0.1/countries/state/cities`, params, { withCredentials: false });
    }
}

module.exports = LocationAPI;
