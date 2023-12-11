import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './survey.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
    UsersModule,
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
