import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/analytics.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AnalyticsEventType } from '@prisma/client';

@ApiTags('analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @ApiOperation({ summary: 'Record new analytics event' })
  @ApiResponse({ status: 201, description: 'Analytics event recorded' })
  create(@Body() createDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all analytics events with pagination' })
  @ApiResponse({ status: 200, description: 'Analytics events retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.analyticsService.findAll(paginationDto);
  }

  @Get('type/:eventType')
  @ApiOperation({ summary: 'Get analytics events by type' })
  @ApiResponse({ status: 200, description: 'Analytics events retrieved' })
  findByType(
    @Param('eventType') eventType: AnalyticsEventType,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.analyticsService.findByType(eventType, paginationDto);
  }

  @Get('website/:websiteId')
  @ApiOperation({ summary: 'Get analytics for a specific website' })
  @ApiResponse({ status: 200, description: 'Website analytics retrieved' })
  findByWebsite(@Param('websiteId') websiteId: string, @Query() paginationDto: PaginationDto) {
    return this.analyticsService.findByWebsite(websiteId, paginationDto);
  }
}
