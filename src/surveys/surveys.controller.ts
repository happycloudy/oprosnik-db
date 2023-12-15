import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private surveysService: SurveysService) {}

  @Post()
  async create(@Body() dto: CreateSurveyDto) {
    return this.surveysService.create(dto);
  }

  @Get('/name/:str')
  async findByName(@Param('str') str: string) {
    return this.surveysService.findByName(str);
  }

  @Get('')
  async findAll() {
    return this.surveysService.findAll();
  }

  @Put('submit')
  async submitSurvey(@Body() dto: SubmitSurveyDto) {
    return this.surveysService.submit(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSurveyDto) {
    return this.surveysService.update(id, dto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.surveysService.deleteById(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.surveysService.findById(id);
  }
}
