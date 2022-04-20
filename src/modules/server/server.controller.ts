import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ServerService } from './server.service';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('servers')
@ApiBearerAuth()
@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new server' })
  @ApiResponse({ status: 201, description: 'Server created' })
  create(@Body() createServerDto: CreateServerDto) {
    return this.serverService.create(createServerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all servers with pagination' })
  @ApiResponse({ status: 200, description: 'Servers retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.serverService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get server by ID' })
  @ApiResponse({ status: 200, description: 'Server retrieved' })
  @ApiResponse({ status: 404, description: 'Server not found' })
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update server' })
  @ApiResponse({ status: 200, description: 'Server updated' })
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(id, updateServerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete server' })
  @ApiResponse({ status: 200, description: 'Server deleted' })
  remove(@Param('id') id: string) {
    return this.serverService.remove(id);
  }
}
