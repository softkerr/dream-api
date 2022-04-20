import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto/website.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('websites')
@ApiBearerAuth()
@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new website' })
  @ApiResponse({ status: 201, description: 'Website created' })
  create(@Body() createDto: CreateWebsiteDto) {
    return this.websiteService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all websites with pagination' })
  @ApiResponse({ status: 200, description: 'Websites retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.websiteService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get website by ID' })
  @ApiResponse({ status: 200, description: 'Website retrieved' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  findOne(@Param('id') id: string) {
    return this.websiteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update website' })
  @ApiResponse({ status: 200, description: 'Website updated' })
  update(@Param('id') id: string, @Body() updateDto: UpdateWebsiteDto) {
    return this.websiteService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete website' })
  @ApiResponse({ status: 200, description: 'Website deleted' })
  remove(@Param('id') id: string) {
    return this.websiteService.remove(id);
  }
}
