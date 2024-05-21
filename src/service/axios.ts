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
	config => {
		return config;
	},
	error => {
		// if an error occurred while request
		errorHandler(error);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	response => {
		// Response OK (2xx)
		return response;
	},
	error => {
		// If an error occured
		errorHandler(error);
		return Promise.reject(error);
	},
);

const errorHandler = (error: {
	response: { data: { message: any } };
	request: any;
	message: any;
}) => {
	if (error.response) {
		if (error.response.data) {
			if (typeof error.response.data === 'string') {
				ErrorAlert(error.response.data);
			} else {
				ErrorAlert(error.response.data?.message || 'An error occurred.');
			}
		}
	} else if (error.request) {
		ErrorAlert('No response received from the server.');
	} else {
		ErrorAlert(error.message);
	}
};

export default axiosInstance;
