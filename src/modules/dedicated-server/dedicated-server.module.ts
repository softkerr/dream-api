import { Module } from '@nestjs/common';
import { DedicatedServerService } from './dedicated-server.service';
import { DedicatedServerController } from './dedicated-server.controller';

@Module({
  controllers: [DedicatedServerController],
  providers: [DedicatedServerService],
  exports: [DedicatedServerService],
})
export class DedicatedServerModule {}
