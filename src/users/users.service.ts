import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { passwordHash } from './constants';
import { Roles } from '../shared/types/Roles';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {
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

  async findSurveysByUser(id: string) {
    const pipeline: mongoose.PipelineStage[] = [
      {
        $unwind: '$surveys',
      },
      {
        $lookup: {
          from: 'surveys',
          let: {
            id: { $toObjectId: '$surveys.id' },
            surveys: '$surveys',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: ['$$surveys', '$$ROOT'] },
              },
            },
            {
              $unset: '_id',
            },
          ],
          as: 'surveys',
        },
      },
      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          items: { $push: { $first: '$surveys' } },
        },
      },
    ];

    if (id !== '0') {
      pipeline.unshift({
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      });
    }

    return this.userModel.aggregate(pipeline);
  }

  async findSurveysByUserGrouped(id: string) {
    const pipeline: mongoose.PipelineStage[] = [
      {
        $unwind: '$surveys',
      },
      {
        $group: {
          _id: '$surveys.id',
          answers: {
            $push: {
              answers: '$surveys.answers',
            },
          },
        },
      },
      {
        $unwind: '$answers',
      },
      {
        $project: {
          answers: '$answers.answers',
        },
      },
      {
        $group: {
          _id: '$_id',
          answers: { $push: '$answers' },
        },
      },

      {
        $lookup: {
          from: 'surveys',
          let: {
            id: { $toObjectId: '$_id' },
            answers: '$answers',
          },
          as: 'survey',
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$id'] } } }],
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$survey', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $project: {
          survey: 0,
        },
      },
    ];

    if (id !== '0') {
      pipeline.unshift({
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      });
    }

    return this.userModel.aggregate(pipeline);
  }
}
