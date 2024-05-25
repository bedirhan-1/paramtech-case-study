import httpClient from './axios';
import { CreatedAddress, IAddress } from '../types/addressTypes';
import { Api } from '../types/apiTypes';

const api: Api = {
	address: {
		getAll: () => httpClient.get('addresses'),
		add: (body: CreatedAddress) => httpClient.post('addresses', body),
		update: (body: IAddress) => httpClient.put(`addresses/${body.id}`, body),
		delete: (id: string) => httpClient.delete(`addresses/${id}`),
	},
	city: {
		getAll: () => httpClient.get('cities'),
	},
};

export { api };
