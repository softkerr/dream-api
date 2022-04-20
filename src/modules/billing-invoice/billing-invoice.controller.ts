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
import { BillingInvoiceService } from './billing-invoice.service';
import { CreateBillingInvoiceDto, UpdateBillingInvoiceDto } from './dto/billing-invoice.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Billing Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('billing-invoices')
export class BillingInvoiceController {
  constructor(private readonly billingInvoiceService: BillingInvoiceService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new billing invoice' })
  create(@Body() createBillingInvoiceDto: CreateBillingInvoiceDto) {
    return this.billingInvoiceService.create(createBillingInvoiceDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all billing invoices' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.billingInvoiceService.findAll(page, limit);
  }

  @Get('overdue')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get overdue invoices' })
  findOverdue() {
    return this.billingInvoiceService.findOverdue();
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get invoices by user ID' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.billingInvoiceService.findByUser(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get a billing invoice by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billingInvoiceService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a billing invoice' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBillingInvoiceDto: UpdateBillingInvoiceDto,
  ) {
    return this.billingInvoiceService.update(id, updateBillingInvoiceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a billing invoice' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.billingInvoiceService.remove(id);
  }
}
