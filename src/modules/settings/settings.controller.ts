import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { CreateGlobalSettingDto, UpdateGlobalSettingDto } from './dto/settings.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('settings')
@ApiBearerAuth()
@Controller('settings')
@UseGuards(RolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new global setting (Admin only)' })
  @ApiResponse({ status: 201, description: 'Setting created' })
  createGlobalSetting(@Body() createDto: CreateGlobalSettingDto) {
    return this.settingsService.createGlobalSetting(createDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all global settings (Admin only)' })
  @ApiResponse({ status: 200, description: 'Settings retrieved' })
  findAllGlobalSettings(@Query() paginationDto: PaginationDto) {
    return this.settingsService.findAllGlobalSettings(paginationDto);
  }

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get all public settings' })
  @ApiResponse({ status: 200, description: 'Public settings retrieved' })
  findPublicSettings() {
    return this.settingsService.findPublicSettings();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get setting by key' })
  @ApiResponse({ status: 200, description: 'Setting retrieved' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  findGlobalSettingByKey(@Param('key') key: string) {
    return this.settingsService.findGlobalSettingByKey(key);
  }

  @Patch(':key')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update setting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Setting updated' })
  updateGlobalSetting(@Param('key') key: string, @Body() updateDto: UpdateGlobalSettingDto) {
    return this.settingsService.updateGlobalSetting(key, updateDto);
  }

  @Delete(':key')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete setting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Setting deleted' })
  removeGlobalSetting(@Param('key') key: string) {
    return this.settingsService.removeGlobalSetting(key);
  }
}
