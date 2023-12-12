import {client} from './client.js';

const uri = '/categories'

export const fetchCreateCategory = async (body) => {
	return client(uri, {
		method: 'POST',
		body: body
	})
}