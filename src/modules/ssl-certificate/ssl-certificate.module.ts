import { Module } from '@nestjs/common';
import { SslCertificateService } from './ssl-certificate.service';
import { SslCertificateController } from './ssl-certificate.controller';

@Module({
  controllers: [SslCertificateController],
  providers: [SslCertificateService],
  exports: [SslCertificateService],
})
export class SslCertificateModule {}
