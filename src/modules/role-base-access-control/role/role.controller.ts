import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleCreateDto } from './dto/role.create.dto';
import { RoleService } from './role.service';
import { RoleUpdateDto } from './dto/role.update.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async create(@Body() payload: RoleCreateDto) {
    return {
      data: await this.service.createService(payload),
      message: 'Role created successfully',
    };
  }

  @Patch(':id')
  async update(@Param() id: string, @Body() payload: RoleUpdateDto) {
    return {
      message: 'Role updated successfully',
      data: await this.service.updateService(id, payload),
    };
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    return {
      data: await this.service.findOneService(id),
      message: 'Role found successfully',
    };
  }

  @Get()
  async findMany(
    @Param('search') search?: string,
    @Param('limit') limit = 10,
    @Param('offset') offset = 0,
  ) {
    return {
      data: await this.service.findManyService(search, limit, offset),
      message: 'Roles found successfully',
    };
  }

  @Delete(':id')
  async deleteOne(@Param() id: string) {
    return {
      data: await this.service.deleteOneService(id),
      message: 'Role deleted successfully',
    };
  }
}
