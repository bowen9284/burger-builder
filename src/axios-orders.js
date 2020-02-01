import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://udemy-burger-builder-2f0a9.firebaseio.com/'
});

export default instance;