import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateMetricsDto {
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

  @ApiProperty({ example: 1000, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  requestCount?: number;

  @ApiProperty({ example: 45.5, required: false })
  @IsOptional()
  @IsNumber()
  cpuUsage?: number;

  @ApiProperty({ example: 60.2, required: false })
  @IsOptional()
  @IsNumber()
  memoryUsage?: number;

  @ApiProperty({ example: 75.8, required: false })
  @IsOptional()
  @IsNumber()
  diskUsage?: number;

  @ApiProperty({ example: 86400, required: false, description: 'Uptime in seconds' })
  @IsOptional()
  @IsInt()
  uptime?: number;
}
