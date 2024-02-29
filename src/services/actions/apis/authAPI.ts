import axios from '../axios';

export default class AuthAPI {
    registerUser(params: any) {
        return axios.post('/users/createuser', params);
    }

    loginUser(params: any) {
        return axios.post('/users/loginuser', params);
    }
}