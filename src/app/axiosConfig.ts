import axios from 'axios';

const cocoAxios = axios.create({
    baseURL: 'https://commercialcourt.eu'
});

// Where you would set stuff like your 'Authorization' header, etc ...
// cocoAxios.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff

// cocoAxios.interceptors.request...

export default cocoAxios;