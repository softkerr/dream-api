import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export enum DnsRecordType {
  A = 'A',
  AAAA = 'AAAA',
  CNAME = 'CNAME',
  MX = 'MX',
  TXT = 'TXT',
  NS = 'NS',
  SRV = 'SRV',
  CAA = 'CAA',
  PTR = 'PTR',
}

export class CreateDnsRecordDto {
  @ApiProperty({ description: 'Domain ID' })
  @IsInt()
  domainId: number;

  @ApiProperty({ description: 'Record type', enum: DnsRecordType })
  @IsEnum(DnsRecordType)
  type: DnsRecordType;

  @ApiProperty({ description: 'Record name (subdomain or @)', example: 'www' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Record value', example: '192.168.1.1' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'TTL in seconds', example: 3600 })
  @IsInt()
  @Min(60)
  ttl: number;

  @ApiProperty({
    description: 'Priority (for MX and SRV records)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateDnsRecordDto {
  @ApiProperty({ description: 'Record name (subdomain or @)', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: 'Record value', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value?: string;

  @ApiProperty({ description: 'TTL in seconds', required: false })
  @IsOptional()
  @IsInt()
  @Min(60)
  ttl?: number;

  @ApiProperty({ description: 'Priority', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiProperty({ description: 'Is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class DnsRecordResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  domainId: number;

  @ApiProperty({ enum: DnsRecordType })
  type: DnsRecordType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  ttl: number;

  @ApiProperty({ nullable: true })
  priority: number | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
