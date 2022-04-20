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
import { CronJobService } from './cron-job.service';
import { CreateCronJobDto, UpdateCronJobDto } from './dto/cron-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Cron Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cron-jobs')
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new cron job' })
  create(@Body() createCronJobDto: CreateCronJobDto) {
    return this.cronJobService.create(createCronJobDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all cron jobs' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.cronJobService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get a cron job by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cronJobService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update a cron job' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCronJobDto: UpdateCronJobDto,
  ) {
    return this.cronJobService.update(id, updateCronJobDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a cron job' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cronJobService.remove(id);
  }
}
