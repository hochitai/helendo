import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

export default request;
