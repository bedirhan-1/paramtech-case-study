import { IAddress } from './addressTypes';

export enum StatusTypes {
	idle = 'idle',
	loading = 'loading',
	succeeded = 'succeeded',
	failed = 'failed',
}

export enum AddressDispatchAction {
	GET_ADDRESSES = 'addresses/fetchAddresses',
	ADD_ADDRESS = 'addresses/addAddress',
	UPDATE_ADDRESS = 'addresses/updateAddress',
	DELETE_ADDRESS = 'addresses/deleteAddress',
}

export interface AddressesState {
	addresses: IAddress[];
	status: StatusTypes;
	error: string | null;
}
