import axios, { AxiosResponse } from "axios";
import { Cipher } from "crypto";

export default class LocationAPI {
    private static endpoint = "https://countriesnow.space";

    getCountries() {
        return axios.get(`${LocationAPI.endpoint}/api/v0.1/countries/positions`, {withCredentials: false});
    }
    getCities(params: any) {
        return axios.post(`${LocationAPI.endpoint}/api/v0.1/countries/states`, params, {withCredentials: false});
    }
    getDistricts(params: any) {
        return axios.post(`${LocationAPI.endpoint}/api/v0.1/countries/state/cities`, params, {withCredentials: false});
    }

}