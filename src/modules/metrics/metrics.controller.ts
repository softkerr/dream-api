import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateMetricsDto } from './dto/metrics.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('metrics')
@ApiBearerAuth()
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  @ApiOperation({ summary: 'Record new metrics' })
  @ApiResponse({ status: 201, description: 'Metrics recorded' })
  create(@Body() createDto: CreateMetricsDto) {
    return this.metricsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all metrics with pagination' })
  @ApiResponse({ status: 200, description: 'Metrics retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.metricsService.findAll(paginationDto);
  }

  @Get('server/:serverId')
  @ApiOperation({ summary: 'Get metrics for a specific server' })
  @ApiResponse({ status: 200, description: 'Server metrics retrieved' })
  findByServer(@Param('serverId') serverId: string, @Query() paginationDto: PaginationDto) {
    return this.metricsService.findByServer(serverId, paginationDto);
  }

  @Get('website/:websiteId')
  @ApiOperation({ summary: 'Get metrics for a specific website' })
  @ApiResponse({ status: 200, description: 'Website metrics retrieved' })
  findByWebsite(@Param('websiteId') websiteId: string, @Query() paginationDto: PaginationDto) {
    return this.metricsService.findByWebsite(websiteId, paginationDto);
  }
}
