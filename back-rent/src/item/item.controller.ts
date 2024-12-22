import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthenticatedRequest } from '../interface/user.interface'; // User interface for types

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // Create a new item
  @UseGuards(TokenAuthGuard) // Protect the route with the authentication guard
  @Post()
  create(
      @Body() createItemDto: CreateItemDto,
      @Req() request: AuthenticatedRequest, // Accessing user from request
  ) {
    return this.itemService.create(createItemDto, request.user._id);
  }

  // Get all items with optional filtering
  @Get()
  findAll(@Req() request) {
    return this.itemService.findAll(request.query);
  }

  // Get item by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  // Update an item
  @UseGuards(TokenAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  // Delete an item
  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
