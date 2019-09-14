import axios from 'axios';

const cocoAxios = axios.create({
    baseURL: 'https://commercialcourt.eu'
});

// Where you would set stuff like your 'Authorization' header, etc ...
cocoAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Also add/ configure interceptors && all the other cool stuff

// cocoAxios.interceptors.request...

export default cocoAxios;