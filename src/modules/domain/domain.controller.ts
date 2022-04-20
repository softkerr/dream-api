import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { CreateDomainDto, UpdateDomainDto } from './dto/domain.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('domains')
@ApiBearerAuth()
@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new domain' })
  @ApiResponse({ status: 201, description: 'Domain created' })
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all domains with pagination' })
  @ApiResponse({ status: 200, description: 'Domains retrieved' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.domainService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get domain by ID' })
  @ApiResponse({ status: 200, description: 'Domain retrieved' })
  @ApiResponse({ status: 404, description: 'Domain not found' })
  findOne(@Param('id') id: string) {
    return this.domainService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update domain' })
  @ApiResponse({ status: 200, description: 'Domain updated' })
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainService.update(id, updateDomainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete domain' })
  @ApiResponse({ status: 200, description: 'Domain deleted' })
  remove(@Param('id') id: string) {
    return this.domainService.remove(id);
  }
}
