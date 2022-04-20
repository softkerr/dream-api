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
import { FtpAccountService } from './ftp-account.service';
import { CreateFtpAccountDto, UpdateFtpAccountDto } from './dto/ftp-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('FTP Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ftp-accounts')
export class FtpAccountController {
  constructor(private readonly ftpAccountService: FtpAccountService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new FTP account' })
  create(@Body() createFtpAccountDto: CreateFtpAccountDto) {
    return this.ftpAccountService.create(createFtpAccountDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all FTP accounts' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.ftpAccountService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get an FTP account by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ftpAccountService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update an FTP account' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFtpAccountDto: UpdateFtpAccountDto,
  ) {
    return this.ftpAccountService.update(id, updateFtpAccountDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an FTP account' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ftpAccountService.remove(id);
  }
}
