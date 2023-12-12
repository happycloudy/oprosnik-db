import { client } from './client.js';

const uri = (id) => `/surveys/${id}`;

export const fetchRemoveSurvey = async (id) => {
  return client(uri(id), { method: 'DELETE' });
};
