import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../service/service';
import { CreatedAddress, IAddress } from '../../../types/addressTypes';
import {
	AddressDispatchAction,
	AddressesState,
	StatusTypes,
} from '../../../types/addressSliceTypes';

export const fetchAddresses = createAsyncThunk<IAddress[]>(
	AddressDispatchAction.GET_ADDRESSES,
	async () => {
		const response = await api.address.getAll();
		return response.data;
	},
);

export const addAddress = createAsyncThunk<IAddress, CreatedAddress>(
	AddressDispatchAction.ADD_ADDRESS,
	async newAddress => {
		const response = await api.address.add(newAddress);
		return response.data as IAddress;
	},
);

export const updateAddress = createAsyncThunk<IAddress, IAddress>(
	AddressDispatchAction.UPDATE_ADDRESS,
	async updatedAddress => {
		const response = await api.address.update(updatedAddress);
		return response.data;
	},
);

export const deleteAddress = createAsyncThunk<string, string>(
	AddressDispatchAction.DELETE_ADDRESS,
	async deletedAddressId => {
		await api.address.delete(deletedAddressId);
		return deletedAddressId;
	},
);

const initialState: AddressesState = {
	addresses: [] as IAddress[],
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
			})
			.addCase(fetchAddresses.fulfilled, (state, action) => {
				state.status = StatusTypes.succeeded;
				state.addresses = action.payload;
			})
			.addCase(fetchAddresses.rejected, (state, action) => {
				state.status = StatusTypes.failed;
				state.error = action.error.message || 'Something went wrong';
			})
			// add addresses
			.addCase(addAddress.pending, state => {
				state.status = StatusTypes.loading;
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
				state.error = action.error.message || 'Failed to add address';
			})
			// update addresses
			.addCase(updateAddress.pending, state => {
				state.status = StatusTypes.loading;
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
				state.error = action.error.message || 'Failed to update address';
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
				state.error = action.error.message || 'Failed to delete address';
			});
	},
});

export default addressSlice.reducer;
