import { Module } from '@nestjs/common';
import { BillingInvoiceService } from './billing-invoice.service';
import { BillingInvoiceController } from './billing-invoice.controller';

@Module({
  controllers: [BillingInvoiceController],
  providers: [BillingInvoiceService],
  exports: [BillingInvoiceService],
})
export class BillingInvoiceModule {}
