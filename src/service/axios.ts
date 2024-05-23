import axios from 'axios';
import { ErrorAlert } from '../utils/errorAlert';

const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Accept: '*/*',
	},
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
	config => config,
	error => {
		errorHandler(error);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		errorHandler(error);
		return Promise.reject(error);
	},
);

const errorHandler = (error: {
	response?: { data?: { message?: string } };
	request?: any;
	message?: string;
}) => {
	if (error.response && error.response.data) {
		const errorMessage =
			typeof error.response.data === 'string'
				? error.response.data
				: error.response.data.message;
		ErrorAlert(errorMessage || 'An error occurred.');
	} else if (error.request) {
		ErrorAlert('No response received from the server.');
	} else {
		ErrorAlert(error.message || 'An unknown error occurred.');
	}
};

export default axiosInstance;
