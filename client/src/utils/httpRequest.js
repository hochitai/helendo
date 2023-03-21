import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
});

export default request;
