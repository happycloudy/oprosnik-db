import {client} from './client.js';

const uri = (id) => `/surveys/${id}`

export const fetchSurveyData = async (id) => {
	return client(uri(id), {})
}