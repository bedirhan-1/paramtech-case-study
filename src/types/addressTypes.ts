export enum AddressInfo {
	AddressTitle = 'addressTitle',
	City = 'city',
	District = 'district',
	AddressDetails = 'addressDetails',
}

export type CreatedAddress = {
	addressTitle: string;
	city: string;
	district: string;
	addressDetails: string;
};

export type IAddress = {
	id: string;
} & CreatedAddress;
