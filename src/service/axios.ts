import axios from 'axios';
import { ErrorAlert } from '../utils/errorAlert';

const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Accept: '*/*',
	},
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

export default axiosInstance;
