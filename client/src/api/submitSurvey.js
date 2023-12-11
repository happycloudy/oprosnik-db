import {client} from './client.js';

const uri = `/surveys/submit`;

export const submitSurvey = async (userId, surveyId, answers) => {
	return client(uri, {
		method: 'PUT',
		body: {userId, surveyId, answers}
	});
};