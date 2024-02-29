import AuthAPI from './apis/authAPI';
import LocationAPI from './apis/locationAPI';

class Request {

    location: LocationAPI;
    auth: AuthAPI


    constructor() {
        this.location = new LocationAPI();
        this.auth = new AuthAPI();
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Request();