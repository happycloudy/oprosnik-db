import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveysService {
  findById(id: string) {}

  deleteById(id: string) {}

  create(createSurveyDto: CreateSurveyDto) {}

  update(updateSurveyDto: UpdateSurveyDto) {}
}
