import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../shared/types/Roles';
import { HydratedDocument } from 'mongoose';
import { UserSurvey } from './interfaces/UserSurvey';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: 'User' })
  role: Roles;

  @Prop({ default: [] })
  surveys: UserSurvey[];
}

export const UserSchema = SchemaFactory.createForClass(User);
