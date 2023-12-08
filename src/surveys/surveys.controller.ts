import { Controller } from '@nestjs/common';
import { SurveysService } from './surveys.service';

@Controller('surveys')
export class SurveysController {
  constructor(private surveysService: SurveysService) {}
}
