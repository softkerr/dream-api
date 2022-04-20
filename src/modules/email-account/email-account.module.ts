import { Module } from '@nestjs/common';
import { EmailAccountService } from './email-account.service';
import { EmailAccountController } from './email-account.controller';

@Module({
  controllers: [EmailAccountController],
  providers: [EmailAccountService],
  exports: [EmailAccountService],
})
export class EmailAccountModule {}
