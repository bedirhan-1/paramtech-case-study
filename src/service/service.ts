import httpClient from './axios';
import { ICreatedAddress } from '../types/addressTypes';
import { IApi } from '../types/apiTypes';

const api: IApi = {
	address: {
		getAll: () => httpClient.get('addresses'),
		add: (body: ICreatedAddress) => httpClient.post('addresses', body),
		update: (id: string, body: ICreatedAddress) =>
			httpClient.put(`addresses/${id}`, body),
		delete: (id: string) => httpClient.delete(`addresses/${id}`),
	},
	city: {
		getAll: () => httpClient.get('cities'),
	},
};

export { api };
