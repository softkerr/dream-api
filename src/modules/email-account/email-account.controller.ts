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
import { EmailAccountService } from './email-account.service';
import { CreateEmailAccountDto, UpdateEmailAccountDto } from './dto/email-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Email Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('email-accounts')
export class EmailAccountController {
  constructor(private readonly emailAccountService: EmailAccountService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new email account' })
  create(@Body() createEmailAccountDto: CreateEmailAccountDto) {
    return this.emailAccountService.create(createEmailAccountDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all email accounts' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.emailAccountService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get an email account by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emailAccountService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update an email account' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmailAccountDto: UpdateEmailAccountDto,
  ) {
    return this.emailAccountService.update(id, updateEmailAccountDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an email account' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emailAccountService.remove(id);
  }
}
