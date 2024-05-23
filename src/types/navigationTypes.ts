import { IAddress } from './addressTypes';

export enum StackScreens {
	addressList = 'addresses',
	addNewAddress = 'addNewAddress',
	splash = 'splashScreen',
}

export type RootStackParamList = {
	[StackScreens.addressList]: undefined;
	[StackScreens.addNewAddress]: { passedAddress: IAddress } | undefined;
	[StackScreens.splash]: undefined;
};
