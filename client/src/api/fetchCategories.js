import {client} from './client.js';

const uri = '/categories'

export const fetchCategories = async () => {
	return client(uri, {})
}