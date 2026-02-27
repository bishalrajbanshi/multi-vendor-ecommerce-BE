import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(
        protected readonly service:RoleService
    ) {}


    @Post()
    async create(
        @Body() payload:any
    ) {
        return {
            data:await this.service.createService(payload),
            message:'Role created successfully'
        }
    }

    @Get()
    async findAll() {
        return {
            data:await this.service.findAllService(),
            message:'Role fetched successfully'
        }
    }

    @Patch(':id')
    async update(
        @Body() payload:any
    ){
        return {
            data:await this.service.updateService(payload.id, payload),
            message:'Role updated successfully'
        }
    }


    @Get()
    async findMany(
        @Query('search') search?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ) {
        {
        const responst = await this.service.findAllService(
            search,page,limit
        );
        return {
            data:responst,
            message:'Role fetched successfully'
        }
    }
}
    @Delete(':id')
    async delete(
        @Param('id') id:string
    ) {
        return {
            data:await this.service.deleteService(id),
            message:'Role deleted successfully'
        }
    }}
