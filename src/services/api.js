import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL DA API →  movie/now_playing?api_key=82e9ff75d797f91e96237834a65c9d12

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;