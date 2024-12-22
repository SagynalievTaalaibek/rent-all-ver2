import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from '../schemas/item.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
      @InjectModel(Item.name) private readonly itemModel: Model<Item>, // Inject Mongo model
  ) {}

  // Create an item
  async create(createItemDto: CreateItemDto, user: string) {
    const newItem = new this.itemModel({
      ...createItemDto,
      user, // User ID passed from the request
    });
    return newItem.save();
  }

  // Get all items with optional filtering
  async findAll(query: any) {
    const filters: any = {};

    if (query.available) {
      filters.availability = true;
    }

    if (query.mainCategory) {
      filters.mainCategoryId = query.mainCategory;
    }

    if (query.category) {
      filters.category = query.category;
    }

    if (query.user) {
      filters.user = query.user;
    }

    return this.itemModel.find(filters).exec();
  }

  // Find item by ID
  async findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  // Update an item
  async update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemModel
        .findByIdAndUpdate(id, updateItemDto, { new: true })
        .exec();
  }

  // Delete an item
  async remove(id: string) {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
