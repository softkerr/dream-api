import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum BackupType {
  FULL = 'FULL',
  INCREMENTAL = 'INCREMENTAL',
  DIFFERENTIAL = 'DIFFERENTIAL',
}

export enum BackupStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum BackupFrequency {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export class CreateBackupDto {
  @ApiProperty({ description: 'Server ID', required: false })
  @IsOptional()
  @IsInt()
  serverId?: number;

  @ApiProperty({ description: 'Website ID', required: false })
  @IsOptional()
  @IsInt()
  websiteId?: number;

  @ApiProperty({ description: 'Database ID', required: false })
  @IsOptional()
  @IsInt()
  databaseId?: number;

  @ApiProperty({ description: 'Backup type', enum: BackupType })
  @IsEnum(BackupType)
  type: BackupType;

  @ApiProperty({ description: 'Backup frequency', enum: BackupFrequency })
  @IsEnum(BackupFrequency)
  frequency: BackupFrequency;

  @ApiProperty({ description: 'Storage path' })
  @IsString()
  @IsNotEmpty()
  storagePath: string;

  @ApiProperty({ description: 'Size in bytes' })
  @IsNumber()
  sizeBytes: number;

  @ApiProperty({ description: 'Retention days', example: 30 })
  @IsInt()
  retentionDays: number;

  @ApiProperty({ description: 'Next backup date', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  nextBackupDate?: Date;
}

export class UpdateBackupDto {
  @ApiProperty({ description: 'Backup status', enum: BackupStatus, required: false })
  @IsOptional()
  @IsEnum(BackupStatus)
  status?: BackupStatus;

  @ApiProperty({ description: 'Size in bytes', required: false })
  @IsOptional()
  @IsNumber()
  sizeBytes?: number;

  @ApiProperty({ description: 'Retention days', required: false })
  @IsOptional()
  @IsInt()
  retentionDays?: number;

  @ApiProperty({ description: 'Next backup date', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  nextBackupDate?: Date;
}

export class BackupResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  serverId: number | null;

  @ApiProperty({ nullable: true })
  websiteId: number | null;

  @ApiProperty({ nullable: true })
  databaseId: number | null;

  @ApiProperty({ enum: BackupType })
  type: BackupType;

  @ApiProperty({ enum: BackupFrequency })
  frequency: BackupFrequency;

  @ApiProperty({ enum: BackupStatus })
  status: BackupStatus;

  @ApiProperty()
  storagePath: string;

  @ApiProperty()
  sizeBytes: number;

  @ApiProperty()
  retentionDays: number;

  @ApiProperty({ nullable: true })
  nextBackupDate: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
