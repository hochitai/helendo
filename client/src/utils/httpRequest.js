import axios from 'axios';

const request = axios.create({
    baseURL: 'https://helendo-server.onrender.com/api',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': 'https://helendo-server.onrender.com',
    },
});

export default request;
