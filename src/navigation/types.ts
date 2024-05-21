export enum StackScreens {
	addressList = 'Adreslerim',
	addNewAddress = 'Add New Address',
}

export type RootStackParamList = {
	[StackScreens.addressList]: undefined;
	[StackScreens.addNewAddress]: undefined;
	navigate: (screen: StackScreens) => void;
};
