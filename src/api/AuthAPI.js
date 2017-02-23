import * as types from './constants';
import axios from 'axios';
import AuthActions from './actions/AuthActions';

const BASE_URL = 'http://localhost:8080/api/';

export function login(userData) {
	return dispatch => axios({
		baseURL: BASE_URL,
		url: 'login',
		method: 'POST',
		data: userData
	}).then(response => {
		if (response.status >= 200 && response.status < 300) {
			console.log(response);
			dispatch(AuthActions.loginSuccess(response));
		} else {
			const error = new Error(response.statusText);
			error.response = response;
			dispatch(AuthActions.login);
			throw error;
		}
	}).catch(error => { console.log('request failed', error); });
}

export function logout() {
	return axios({
		baseURL: BASE_URL,
		url: 'logout',
		method: 'DELETE'
	})
}