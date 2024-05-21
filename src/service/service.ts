import axios from './axios';

const api = {
	address: {
		getAll: () => axios.get('addressList'),
	},
};

export { api };
