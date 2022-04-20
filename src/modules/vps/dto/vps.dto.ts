import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsEnum, IsUUID } from 'class-validator';
import { ServerStatus } from '@prisma/client';

export class CreateVpsDto {
  @ApiProperty({ example: 'VPS-001' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'uuid-of-server' })
  @IsUUID()
  serverId: string;

  @ApiProperty({ example: 'Basic Plan', required: false })
  @IsOptional()
  @IsString()
  planName?: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  vcpus?: number;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsInt()
  ramGB?: number;

  @ApiProperty({ example: 80, required: false })
  @IsOptional()
  @IsInt()
  storageGB?: number;

  @ApiProperty({ enum: ServerStatus, default: ServerStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(ServerStatus)
  status?: ServerStatus;
}

export class UpdateVpsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  planName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  vcpus?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  ramGB?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  storageGB?: number;

  @ApiProperty({ enum: ServerStatus, required: false })
  @IsOptional()
  @IsEnum(ServerStatus)
  status?: ServerStatus;
}
