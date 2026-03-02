import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoleCreateDto } from './dto/role.create.dto';
import { RoleService } from './role.service';
import { RoleUpdateDto } from './dto/role.update.dto';
import { queryRoleDto } from './dto/query.role.dto';
import { paginateData } from 'src/core/helper/pagination.helper';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async create(@Body() payload: RoleCreateDto) {
   return this.service.createService(payload);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: RoleUpdateDto,
  ) {
    return {
      message: 'Role updated successfully',
      data: await this.service.updateService(id, payload),
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return {
      data: await this.service.findOneService(id),
      message: 'Role found successfully',
    };
  }

  @Get()
  async findMany(@Query() parmas: queryRoleDto) {
    const { page, perPage } = parmas;
    const data = await this.service.findManyService({
      search: parmas.search,
      page: Number(page) || 1,
      perPage: Number(perPage) || 10,
    });

    const pagination = paginateData(
      data.length,
      Number(page) || 1,
      Number(perPage) || 10,
    );
    return {
      data: data,
      pagination,
      message: 'Roles found successfully',
    };
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return {
      data: await this.service.deleteOneService(id),
      message: 'Role deleted successfully',
    };
  }
}
