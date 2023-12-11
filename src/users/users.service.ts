import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { passwordHash } from './constants';
import { Roles } from '../shared/types/Roles';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.userModel.findOne({ username: 'admin' }).then((res) => {
      if (!res) {
        this.create({
          username: 'admin',
          password: 'admin',
          role: Roles.ADMIN,
        });
      }
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, passwordHash);
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async deleteById(id: string) {
    const result = await this.userModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(dto.password);
    return this.userModel.create({ ...dto, password: hashedPassword });
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, dto);
  }

  async saveSurvey(id: string, surveyId: string, answers: number[]) {
    return this.userModel.updateOne(
      { _id: id },
      {
        $push: {
          surveys: {
            id: surveyId,
            answers: answers,
          },
        },
      },
    );
  }
}
