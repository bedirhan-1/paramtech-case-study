export enum AddressInfo {
	AddressTitle = 'addressTitle',
	City = 'city',
	AddressDetails = 'addressDetails',
}

export type ICreatedAddress = {
	addressTitle: string;
	addressDetails: string;
	city: string;
};

export type IAddress = {
	id: string | undefined;
} & ICreatedAddress;

export type City = {
	city: string;
	id: string;
};
