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
import { SslCertificateService } from './ssl-certificate.service';
import {
  CreateSslCertificateDto,
  UpdateSslCertificateDto,
} from './dto/ssl-certificate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('SSL Certificates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ssl-certificates')
export class SslCertificateController {
  constructor(private readonly sslCertificateService: SslCertificateService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new SSL certificate' })
  create(@Body() createSslCertificateDto: CreateSslCertificateDto) {
    return this.sslCertificateService.create(createSslCertificateDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all SSL certificates with pagination' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.sslCertificateService.findAll(page, limit);
  }

  @Get('expiring')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get SSL certificates expiring soon' })
  findExpiring(@Query('days', ParseIntPipe) days: number = 30) {
    return this.sslCertificateService.findExpiring(days);
  }

  @Get('expired')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get expired SSL certificates' })
  findExpired() {
    return this.sslCertificateService.findExpired();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get an SSL certificate by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sslCertificateService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update an SSL certificate' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSslCertificateDto: UpdateSslCertificateDto,
  ) {
    return this.sslCertificateService.update(id, updateSslCertificateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an SSL certificate' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sslCertificateService.remove(id);
  }
}
