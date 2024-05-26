import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../service/service';
import { ICreatedAddress, IAddress } from '../../../types/addressTypes';
import {
	AddressDispatchAction,
	AddressesState,
	StatusTypes,
} from '../../../types/addressSliceTypes';

export const fetchAddresses = createAsyncThunk<
	IAddress[],
	void,
	{ rejectValue: string }
>(AddressDispatchAction.GET_ADDRESSES, async (_, { rejectWithValue }) => {
	try {
		const response = await api.address.getAll();
		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Error.not-found');
	}
});

export const addAddress = createAsyncThunk<
	IAddress,
	ICreatedAddress,
	{ rejectValue: string }
>(
	AddressDispatchAction.ADD_ADDRESS,
	async (newAddress, { rejectWithValue }) => {
		try {
			const response = await api.address.add(newAddress);
			return response.data as IAddress;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Error.add-address',
			);
		}
	},
);

export const updateAddress = createAsyncThunk<
	IAddress,
	IAddress,
	{ rejectValue: string }
>(
	AddressDispatchAction.UPDATE_ADDRESS,
	async (updatedAddress, { rejectWithValue }) => {
		const temp: ICreatedAddress = {
			city: updatedAddress.city,
			addressDetails: updatedAddress.addressDetails,
			addressTitle: updatedAddress.addressTitle,
		};

		try {
			const response = await api.address.update(updatedAddress.id!, temp);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Error.update-address',
			);
		}
	},
);

export const deleteAddress = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>(
	AddressDispatchAction.DELETE_ADDRESS,
	async (deletedAddressId, { rejectWithValue }) => {
		try {
			await api.address.delete(deletedAddressId);
			return deletedAddressId;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Error.delete-address',
			);
		}
	},
);

const initialState: AddressesState = {
	addresses: [],
	status: StatusTypes.idle,
	error: null,
};

const addressSlice = createSlice({
	name: 'addresses',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// fetchAddresses
			.addCase(fetchAddresses.pending, state => {
				state.status = StatusTypes.loading;
				state.error = '';
			})
			.addCase(
				fetchAddresses.fulfilled,
				(state, action: PayloadAction<IAddress[]>) => {
					state.status = StatusTypes.succeeded;
					state.addresses = action.payload;
				},
			)
			.addCase(fetchAddresses.rejected, (state, action) => {
				state.status = StatusTypes.failed;
				state.error = action.payload as string;
			})
			// add addresses
			.addCase(addAddress.pending, state => {
				state.status = StatusTypes.loading;
				state.error = '';
			})
			.addCase(
				addAddress.fulfilled,
				(state, action: PayloadAction<IAddress>) => {
					state.status = StatusTypes.succeeded;
					state.addresses.push(action.payload);
				},
			)
			.addCase(addAddress.rejected, (state, action) => {
				state.status = StatusTypes.failed;
				state.error = action.payload as string;
			})
			// update addresses
			.addCase(updateAddress.pending, state => {
				state.status = StatusTypes.loading;
				state.error = '';
			})
			.addCase(
				updateAddress.fulfilled,
				(state, action: PayloadAction<IAddress>) => {
					state.status = StatusTypes.succeeded;
					const index = state.addresses.findIndex(
						address => address.id === action.payload.id,
					);
					if (index !== -1) {
						state.addresses[index] = action.payload;
					}
				},
			)
			.addCase(updateAddress.rejected, (state, action) => {
				state.status = StatusTypes.failed;
				state.error = action.payload as string;
			})
			// delete address
			.addCase(deleteAddress.pending, state => {
				state.status = StatusTypes.loading;
			})
			.addCase(
				deleteAddress.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.status = StatusTypes.succeeded;
					state.addresses = state.addresses.filter(
						address => address.id !== action.payload,
					);
				},
			)
			.addCase(deleteAddress.rejected, (state, action) => {
				state.status = StatusTypes.failed;
				state.error = action.payload as string;
			});
	},
});

export default addressSlice.reducer;
