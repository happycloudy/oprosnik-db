import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../shared/interfaces/Question';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop({ index: true })
  name: string;

  @Prop()
  questions: Question[];

  @Prop({ default: null })
  categoryId: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);

SurveySchema.index({ name: 'text' });
