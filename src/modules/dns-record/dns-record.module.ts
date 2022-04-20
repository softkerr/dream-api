import { Module } from '@nestjs/common';
import { DnsRecordService } from './dns-record.service';
import { DnsRecordController } from './dns-record.controller';

@Module({
  controllers: [DnsRecordController],
  providers: [DnsRecordService],
  exports: [DnsRecordService],
})
export class DnsRecordModule {}
