import { Question } from '../../shared/interfaces/Question';

export interface UpdateSurveyDto {
  name: string;
  questions: Question[];
}
