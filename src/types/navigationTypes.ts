import { IAddress } from './addressTypes';

export enum StackScreens {
	addressList = 'Adreslerim',
	addNewAddress = 'Add New Address',
	splash = 'Splash Screen',
}

export type RootStackParamList = {
	[StackScreens.addressList]: undefined;
	[StackScreens.addNewAddress]: { passedAddress: IAddress } | undefined;
	[StackScreens.splash]: undefined;
};
