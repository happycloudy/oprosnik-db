import { client } from './client.js';

const uri = '/surveys';

export const fetchSurveys = async (token) => {
  return client(uri, { token });
};
