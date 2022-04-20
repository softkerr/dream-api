import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsEnum, IsUUID } from 'class-validator';
import { ServerStatus } from '@prisma/client';

export class CreateDedicatedServerDto {
  @ApiProperty({ example: 'Dedicated-001' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'uuid-of-server' })
  @IsUUID()
  serverId: string;

  @ApiProperty({ example: 'Intel Xeon E5-2680', required: false })
  @IsOptional()
  @IsString()
  cpuModel?: string;

  @ApiProperty({ example: 16, required: false })
  @IsOptional()
  @IsInt()
  cpuCores?: number;

  @ApiProperty({ example: 64, required: false })
  @IsOptional()
  @IsInt()
  ramGB?: number;

  @ApiProperty({ example: 'SSD', required: false })
  @IsOptional()
  @IsString()
  storageType?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  @IsInt()
  storageGB?: number;

  @ApiProperty({ enum: ServerStatus, default: ServerStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(ServerStatus)
  status?: ServerStatus;
}

export class UpdateDedicatedServerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cpuModel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  cpuCores?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  ramGB?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  storageType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  storageGB?: number;

  @ApiProperty({ enum: ServerStatus, required: false })
  @IsOptional()
  @IsEnum(ServerStatus)
  status?: ServerStatus;
}
