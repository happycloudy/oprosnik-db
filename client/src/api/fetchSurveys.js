import {client} from './client.js';

const uri = '/surveys'

export const fetchSurveys = async () => {
	return client(uri, {})
}