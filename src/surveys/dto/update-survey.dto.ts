import { CreateSurveyDto } from './create-survey.dto';

export type UpdateSurveyDto = Omit<CreateSurveyDto, 'createdBy'>;
