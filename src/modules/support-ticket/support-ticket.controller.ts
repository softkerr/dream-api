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
import { SupportTicketService } from './support-ticket.service';
import { CreateSupportTicketDto, UpdateSupportTicketDto } from './dto/support-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Support Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('support-tickets')
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new support ticket' })
  create(@Body() createSupportTicketDto: CreateSupportTicketDto) {
    return this.supportTicketService.create(createSupportTicketDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all support tickets' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.supportTicketService.findAll(page, limit);
  }

  @Get('status/:status')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get tickets by status' })
  findByStatus(@Param('status') status: string) {
    return this.supportTicketService.findByStatus(status);
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get tickets by user ID' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.supportTicketService.findByUser(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get a support ticket by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supportTicketService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update a support ticket' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupportTicketDto: UpdateSupportTicketDto,
  ) {
    return this.supportTicketService.update(id, updateSupportTicketDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a support ticket' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supportTicketService.remove(id);
  }
}
