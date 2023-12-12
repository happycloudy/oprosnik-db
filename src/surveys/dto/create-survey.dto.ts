import { Question } from '../../shared/interfaces/Question';

export interface CreateSurveyDto {
  name: string;
  createdBy: string;
  questions: Question[];
  category: string;
}
