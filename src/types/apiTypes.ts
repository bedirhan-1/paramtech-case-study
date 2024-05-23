import { AxiosResponse } from 'axios';
import { CreatedAddress, IAddress } from './addressTypes';

export type Api = {
	address: {
		getAll: () => Promise<AxiosResponse<IAddress[]>>;
		add: (address: CreatedAddress) => Promise<AxiosResponse<CreatedAddress>>;
		update: (address: IAddress) => Promise<AxiosResponse<IAddress>>;
		delete: (id: string) => Promise<AxiosResponse<IAddress>>;
	};
	city: {
		getAll: () => Promise<AxiosResponse<IAddress[]>>;
	};
};
