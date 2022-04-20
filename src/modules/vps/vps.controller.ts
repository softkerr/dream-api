import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VpsService } from './vps.service';
import { CreateVpsDto, UpdateVpsDto } from './dto/vps.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('vps')
@ApiBearerAuth()
@Controller('vps')
export class VpsController {
  constructor(private readonly vpsService: VpsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new VPS' })
  @ApiResponse({ status: 201, description: 'VPS created' })
  create(@Body() createVpsDto: CreateVpsDto) {
    return this.vpsService.create(createVpsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all VPS instances with pagination' })
  @ApiResponse({ status: 200, description: 'VPS instances retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.vpsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get VPS by ID' })
  @ApiResponse({ status: 200, description: 'VPS retrieved' })
  @ApiResponse({ status: 404, description: 'VPS not found' })
  findOne(@Param('id') id: string) {
    return this.vpsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update VPS' })
  @ApiResponse({ status: 200, description: 'VPS updated' })
  update(@Param('id') id: string, @Body() updateVpsDto: UpdateVpsDto) {
    return this.vpsService.update(id, updateVpsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete VPS' })
  @ApiResponse({ status: 200, description: 'VPS deleted' })
  remove(@Param('id') id: string) {
    return this.vpsService.remove(id);
  }
}
