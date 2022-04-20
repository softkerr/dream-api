import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateDomainDto {
  @ApiProperty({ example: 'example.com' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'GoDaddy', required: false })
  @IsOptional()
  @IsString()
  registrar?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ default: false, required: false })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;
}

export class UpdateDomainDto {
  @ApiProperty({ example: 'example.com', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  registrar?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
