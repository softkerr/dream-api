import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    credentials: true,
  });

  // Global prefix
  const apiPrefix = configService.get('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Dream API')
    .setDescription('Production-ready NestJS API with Clean Architecture')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('domains', 'Domain management')
    .addTag('servers', 'Server management')
    .addTag('vps', 'VPS management')
    .addTag('dedicated-servers', 'Dedicated server management')
    .addTag('websites', 'Website management')
    .addTag('metrics', 'Metrics tracking')
    .addTag('analytics', 'Analytics and events')
    .addTag('settings', 'Settings management')
    .addTag('DNS Records', 'DNS record management')
    .addTag('SSL Certificates', 'SSL/TLS certificate management')
    .addTag('Backups', 'Backup management')
    .addTag('Email Accounts', 'Email account management')
    .addTag('Databases', 'Database instance management')
    .addTag('FTP Accounts', 'FTP/SFTP account management')
    .addTag('Cron Jobs', 'Scheduled task management')
    .addTag('Firewall Rules', 'Firewall rule management')
    .addTag('Billing Invoices', 'Invoice and payment tracking')
    .addTag('Support Tickets', 'Support ticket system')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT', 3000);
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
