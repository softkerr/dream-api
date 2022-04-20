import { Module } from '@nestjs/common';
import { FtpAccountService } from './ftp-account.service';
import { FtpAccountController } from './ftp-account.controller';

@Module({
  controllers: [FtpAccountController],
  providers: [FtpAccountService],
  exports: [FtpAccountService],
})
export class FtpAccountModule {}
