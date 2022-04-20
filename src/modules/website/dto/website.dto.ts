import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID, IsUrl } from 'class-validator';

export class CreateWebsiteDto {
  @ApiProperty({ example: 'My Website' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com' })
  @IsUrl()
  url: string;

  @ApiProperty({ example: 'uuid-of-domain', required: false })
  @IsOptional()
  @IsUUID()
  domainId?: string;

  @ApiProperty({ example: 'uuid-of-server', required: false })
  @IsOptional()
  @IsUUID()
  serverId?: string;

  @ApiProperty({ default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ default: false, required: false })
  @IsOptional()
  @IsBoolean()
  sslEnabled?: boolean;
}

export class UpdateWebsiteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  domainId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  serverId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  sslEnabled?: boolean;
}
