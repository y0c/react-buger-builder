import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-bd06b.firebaseio.com/'
});

export default instance;