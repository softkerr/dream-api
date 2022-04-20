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
import { BackupService } from './backup.service';
import { CreateBackupDto, UpdateBackupDto } from './dto/backup.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Backups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('backups')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new backup' })
  create(@Body() createBackupDto: CreateBackupDto) {
    return this.backupService.create(createBackupDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all backups with pagination' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.backupService.findAll(page, limit);
  }

  @Get('server/:serverId')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get backups by server ID' })
  findByServer(@Param('serverId', ParseIntPipe) serverId: number) {
    return this.backupService.findByServer(serverId);
  }

  @Get('website/:websiteId')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get backups by website ID' })
  findByWebsite(@Param('websiteId', ParseIntPipe) websiteId: number) {
    return this.backupService.findByWebsite(websiteId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get a backup by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.backupService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update a backup' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBackupDto: UpdateBackupDto,
  ) {
    return this.backupService.update(id, updateBackupDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a backup' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.backupService.remove(id);
  }
}
