import {client} from './client.js';

const uri = '/surveys'

export const fetchCreateSurvey = async (body) => {
	return client(uri, {
		method: 'POST',
		body: body
	})
}