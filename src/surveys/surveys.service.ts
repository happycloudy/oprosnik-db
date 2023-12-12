import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './survey.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<Survey>,
    private usersService: UsersService,
  ) {}

  async findById(id: string) {
    return this.surveyModel.findById(id);
  }

  async findAll() {
    return this.surveyModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          let: {
            id: { $toObjectId: '$categoryId' },
          },
          as: 'category',
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$id'] } } }],
        },
      },
      {
        $unset: 'categoryId',
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }

  async deleteById(id: string) {
    const result = await this.surveyModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }

  async create(dto: CreateSurveyDto) {
    return this.surveyModel.create(dto);
  }

  async update(id: string, dto: UpdateSurveyDto) {
    return this.surveyModel.updateOne({ _id: id }, dto);
  }

  async submit(dto: SubmitSurveyDto) {
    return this.usersService.saveSurvey(dto.userId, dto.surveyId, dto.answers);
  }
}
