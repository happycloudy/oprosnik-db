import {client} from './client.js';

const uri = '/auth/register'

export const fetchRegister = async (body) => {
	return client(uri, {body: body, method: 'POST'})
}