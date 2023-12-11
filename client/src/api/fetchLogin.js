import {client} from './client.js';

const uri = '/auth/login'

export const fetchLogin = async (body) => {
	return client(uri, {body: body, method: 'POST'})
}