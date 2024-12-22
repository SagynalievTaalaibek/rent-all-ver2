import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Category} from "../schemas/category.schema";
import {Model} from "mongoose";

@Injectable()
export class CategoryService {
  constructor(
      @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  // Create a new category
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  // Find all categories
  async findAll() {
    return this.categoryModel.find().exec();
  }

  // Find a category by ID
  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  // Update a category by ID
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
  }

  // Remove a category by ID
  async remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}

