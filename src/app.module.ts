import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DomainModule } from './modules/domain/domain.module';
import { ServerModule } from './modules/server/server.module';
import { VpsModule } from './modules/vps/vps.module';
import { DedicatedServerModule } from './modules/dedicated-server/dedicated-server.module';
import { WebsiteModule } from './modules/website/website.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SettingsModule } from './modules/settings/settings.module';
import { DnsRecordModule } from './modules/dns-record/dns-record.module';
import { SslCertificateModule } from './modules/ssl-certificate/ssl-certificate.module';
import { BackupModule } from './modules/backup/backup.module';
import { EmailAccountModule } from './modules/email-account/email-account.module';
import { DatabaseModule } from './modules/database/database.module';
import { FtpAccountModule } from './modules/ftp-account/ftp-account.module';
import { CronJobModule } from './modules/cron-job/cron-job.module';
import { FirewallRuleModule } from './modules/firewall-rule/firewall-rule.module';
import { BillingInvoiceModule } from './modules/billing-invoice/billing-invoice.module';
import { SupportTicketModule } from './modules/support-ticket/support-ticket.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    DomainModule,
    ServerModule,
    VpsModule,
    DedicatedServerModule,
    WebsiteModule,
    MetricsModule,
    AnalyticsModule,
    SettingsModule,

    DnsRecordModule,
    SslCertificateModule,
    BackupModule,
    EmailAccountModule,
    DatabaseModule,
    FtpAccountModule,
    CronJobModule,
    FirewallRuleModule,
    BillingInvoiceModule,
    SupportTicketModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
