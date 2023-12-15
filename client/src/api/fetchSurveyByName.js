import { client } from './client.js';

const uri = (str) => `/surveys/name/${str}`;

export const fetchSurveyByName = async (str) => {
  return str ? client(uri(str), {}) : [];
};
