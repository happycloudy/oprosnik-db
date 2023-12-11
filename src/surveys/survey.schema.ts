import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../shared/interfaces/Question';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop()
  name: string;

  @Prop()
  createdBy: string;

  @Prop()
  questions: Question[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
