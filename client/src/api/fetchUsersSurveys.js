import {client} from './client.js';

const uri = '/users/surveys/0';

export const fetchUsersSurveys = async () => {
	return client(uri, {});
};