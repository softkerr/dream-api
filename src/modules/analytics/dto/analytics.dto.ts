import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsEnum, IsString, IsNumber, IsObject } from 'class-validator';
import { AnalyticsEventType } from '@prisma/client';

export class CreateAnalyticsDto {
  @ApiProperty({ example: 'uuid-of-server', required: false })
  @IsOptional()
  @IsUUID()
  serverId?: string;

  @ApiProperty({ example: 'uuid-of-vps', required: false })
  @IsOptional()
  @IsUUID()
  vpsId?: string;

  @ApiProperty({ example: 'uuid-of-dedicated-server', required: false })
  @IsOptional()
  @IsUUID()
  dedicatedServerId?: string;

  @ApiProperty({ example: 'uuid-of-website', required: false })
  @IsOptional()
  @IsUUID()
  websiteId?: string;

  @ApiProperty({ enum: AnalyticsEventType, example: AnalyticsEventType.TRAFFIC })
  @IsEnum(AnalyticsEventType)
  eventType: AnalyticsEventType;

  @ApiProperty({ example: 'Page View' })
  @IsString()
  eventName: string;

  @ApiProperty({ required: false, example: { source: 'google', campaign: 'summer' } })
  @IsOptional()
  @IsObject()
  eventData?: Record<string, any>;

  @ApiProperty({ required: false, example: 1024.5 })
  @IsOptional()
  @IsNumber()
  trafficVolume?: number;

  @ApiProperty({ required: false, example: 100.0 })
  @IsOptional()
  @IsNumber()
  usageAmount?: number;

  @ApiProperty({ required: false, example: 50.99 })
  @IsOptional()
  @IsNumber()
  billingAmount?: number;

  @ApiProperty({ required: false, example: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;
}
