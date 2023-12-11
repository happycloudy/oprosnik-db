import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './categories.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findById(id: string) {
    return this.categoryModel.findById(id);
  }

  async deleteById(id: string) {
    const result = await this.categoryModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }

  async create(dto: CreateCategoryDto) {
    return this.categoryModel.create(dto);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.categoryModel.updateOne({ _id: id }, dto);
  }
}
