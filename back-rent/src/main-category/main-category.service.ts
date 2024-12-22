import { Injectable } from '@nestjs/common';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';
import {InjectModel} from "@nestjs/mongoose";
import {MainCategory} from "../schemas/mainCategory.schema";
import {Model} from "mongoose";

@Injectable()
export class MainCategoryService {
  constructor(
      @InjectModel(MainCategory.name)
      private readonly mainCategoryModel: Model<MainCategory>,
  ) {}

  async create(createMainCategoryDto: CreateMainCategoryDto) {
    const mainCategory = new this.mainCategoryModel(createMainCategoryDto);
    return mainCategory.save();
  }

  async findAll() {
    return this.mainCategoryModel.find().exec(); // Fetch all main categories
  }

  async findOne(id: string) {
    return this.mainCategoryModel.findById(id).exec(); // Fetch a single main category by ID
  }

  async update(id: string, updateMainCategoryDto: UpdateMainCategoryDto) {
    return this.mainCategoryModel.findByIdAndUpdate(id, updateMainCategoryDto, { new: true }).exec(); // Update the category
  }

  async remove(id: string) {
    return this.mainCategoryModel.findByIdAndDelete(id).exec(); // Remove the category by ID
  }
}

