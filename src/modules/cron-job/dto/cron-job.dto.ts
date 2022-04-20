import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateCronJobDto {
  @ApiProperty({ description: 'Server ID' })
  @IsInt()
  serverId: number;

  @ApiProperty({ description: 'Job name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Cron expression', example: '0 0 * * *' })
  @IsString()
  @IsNotEmpty()
  schedule: string;

  @ApiProperty({ description: 'Command to execute' })
  @IsString()
  @IsNotEmpty()
  command: string;

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCronJobDto {
  @ApiProperty({ description: 'Job name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Cron expression', required: false })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiProperty({ description: 'Command to execute', required: false })
  @IsOptional()
  @IsString()
  command?: string;

  @ApiProperty({ description: 'Is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
