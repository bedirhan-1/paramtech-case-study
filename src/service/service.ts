import httpClient from './axios';
import { CreatedAddress, IAddress } from '../types/addressTypes';
import { Api } from '../types/apiTypes';

const api: Api = {
	address: {
		getAll: () => httpClient.get('addressList'),
		add: (body: CreatedAddress) => httpClient.post('addressList', body),
		update: (body: IAddress) => httpClient.put(`addressList/${body.id}`, body),
		delete: (id: string) => httpClient.delete(`addressList/${id}`),
	},
};

export { api };
