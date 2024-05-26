import { AxiosResponse } from 'axios';
import { City, ICreatedAddress, IAddress } from './addressTypes';

export type IApi = {
	address: {
		getAll: () => Promise<AxiosResponse<IAddress[]>>;
		add: (address: ICreatedAddress) => Promise<AxiosResponse<ICreatedAddress>>;
		update: (
			id: string,
			address: ICreatedAddress,
		) => Promise<AxiosResponse<IAddress>>;
		delete: (id: string) => Promise<AxiosResponse<IAddress>>;
	};
	city: {
		getAll: () => Promise<AxiosResponse<City[]>>;
	};
};
