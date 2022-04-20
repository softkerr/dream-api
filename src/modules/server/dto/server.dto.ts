import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ServerStatus } from '@prisma/client';

export class CreateServerDto {
  @ApiProperty({ example: 'Production Server' })
  @IsString()
  name: string;

  @ApiProperty({ example: '192.168.1.1' })
  @IsString()
  ipAddress: string;

  @ApiProperty({ example: 'US East', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'AWS', required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty({ enum: ServerStatus, default: ServerStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(ServerStatus)
  status?: ServerStatus;
}

export class UpdateServerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty({ enum: ServerStatus, required: false })
  @IsOptional()
  @IsEnum(ServerStatus)
  status?: ServerStatus;
}
