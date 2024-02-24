import LocationAPI from './locationAPI';

class Request {
    location: LocationAPI



    constructor() {
        this.location = new LocationAPI();
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Request();