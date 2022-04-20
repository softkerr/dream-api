import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DedicatedServerService } from './dedicated-server.service';
import { CreateDedicatedServerDto, UpdateDedicatedServerDto } from './dto/dedicated-server.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('dedicated-servers')
@ApiBearerAuth()
@Controller('dedicated-servers')
export class DedicatedServerController {
  constructor(private readonly dedicatedServerService: DedicatedServerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dedicated server' })
  @ApiResponse({ status: 201, description: 'Dedicated server created' })
  create(@Body() createDto: CreateDedicatedServerDto) {
    return this.dedicatedServerService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dedicated servers with pagination' })
  @ApiResponse({ status: 200, description: 'Dedicated servers retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.dedicatedServerService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dedicated server by ID' })
  @ApiResponse({ status: 200, description: 'Dedicated server retrieved' })
  @ApiResponse({ status: 404, description: 'Dedicated server not found' })
  findOne(@Param('id') id: string) {
    return this.dedicatedServerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update dedicated server' })
  @ApiResponse({ status: 200, description: 'Dedicated server updated' })
  update(@Param('id') id: string, @Body() updateDto: UpdateDedicatedServerDto) {
    return this.dedicatedServerService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dedicated server' })
  @ApiResponse({ status: 200, description: 'Dedicated server deleted' })
  remove(@Param('id') id: string) {
    return this.dedicatedServerService.remove(id);
  }
}
