import {client} from './client.js';

const uri = (id) => `/categories/${id}`

export const fetchRemoveCategory = async (id) => {
	return client(uri(id), {
		method: 'DELETE'
	})
}