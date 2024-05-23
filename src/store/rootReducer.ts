import { combineReducers } from '@reduxjs/toolkit';
import addressSlice from './features/address/addressSlice';

const rootReducer = combineReducers({
	address: addressSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
