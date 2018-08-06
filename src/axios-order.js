import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://burger-builder-app1.firebaseio.com/'
});

export default instance;