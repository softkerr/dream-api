import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DnsRecordService } from './dns-record.service';
import {
  CreateDnsRecordDto,
  UpdateDnsRecordDto,
  DnsRecordResponseDto,
} from './dto/dns-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('DNS Records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dns-records')
export class DnsRecordController {
  constructor(private readonly dnsRecordService: DnsRecordService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new DNS record' })
  create(@Body() createDnsRecordDto: CreateDnsRecordDto) {
    return this.dnsRecordService.create(createDnsRecordDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all DNS records with pagination' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('domainId') domainId?: string,
  ) {
    const domainIdInt = domainId ? parseInt(domainId, 10) : undefined;
    return this.dnsRecordService.findAll(page, limit, domainIdInt);
  }

  @Get('domain/:domainId')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all DNS records for a specific domain' })
  findByDomain(@Param('domainId', ParseIntPipe) domainId: number) {
    return this.dnsRecordService.findByDomain(domainId);
  }

  @Get('type/:type')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get DNS records by type' })
  findByType(
    @Param('type') type: string,
    @Query('domainId') domainId?: string,
  ) {
    const domainIdInt = domainId ? parseInt(domainId, 10) : undefined;
    return this.dnsRecordService.findByType(type, domainIdInt);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get a DNS record by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dnsRecordService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update a DNS record' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDnsRecordDto: UpdateDnsRecordDto,
  ) {
    return this.dnsRecordService.update(id, updateDnsRecordDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a DNS record' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dnsRecordService.remove(id);
  }
}
