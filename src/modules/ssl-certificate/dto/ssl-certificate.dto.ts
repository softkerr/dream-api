import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDate,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CertificateType {
  SSL = 'SSL',
  TLS = 'TLS',
  WILDCARD = 'WILDCARD',
  EV = 'EV',
  DV = 'DV',
  OV = 'OV',
}

export enum CertificateProvider {
  LETS_ENCRYPT = 'LETS_ENCRYPT',
  COMODO = 'COMODO',
  DIGICERT = 'DIGICERT',
  GODADDY = 'GODADDY',
  SECTIGO = 'SECTIGO',
  CUSTOM = 'CUSTOM',
}

export class CreateSslCertificateDto {
  @ApiProperty({ description: 'Domain ID' })
  @IsInt()
  domainId: number;

  @ApiProperty({ description: 'Certificate type', enum: CertificateType })
  @IsEnum(CertificateType)
  type: CertificateType;

  @ApiProperty({ description: 'Certificate provider', enum: CertificateProvider })
  @IsEnum(CertificateProvider)
  provider: CertificateProvider;

  @ApiProperty({ description: 'Certificate issuer' })
  @IsString()
  @IsNotEmpty()
  issuer: string;

  @ApiProperty({ description: 'Issue date' })
  @Type(() => Date)
  @IsDate()
  issueDate: Date;

  @ApiProperty({ description: 'Expiration date' })
  @Type(() => Date)
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ description: 'Auto-renew enabled', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @ApiProperty({ description: 'Certificate chain (PEM format)', required: false })
  @IsOptional()
  @IsString()
  certificateChain?: string;

  @ApiProperty({ description: 'Private key (encrypted)', required: false })
  @IsOptional()
  @IsString()
  privateKey?: string;
}

export class UpdateSslCertificateDto {
  @ApiProperty({ description: 'Certificate issuer', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  issuer?: string;

  @ApiProperty({ description: 'Issue date', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  issueDate?: Date;

  @ApiProperty({ description: 'Expiration date', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expirationDate?: Date;

  @ApiProperty({ description: 'Auto-renew enabled', required: false })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @ApiProperty({ description: 'Certificate chain (PEM format)', required: false })
  @IsOptional()
  @IsString()
  certificateChain?: string;

  @ApiProperty({ description: 'Private key (encrypted)', required: false })
  @IsOptional()
  @IsString()
  privateKey?: string;
}

export class SslCertificateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  domainId: number;

  @ApiProperty({ enum: CertificateType })
  type: CertificateType;

  @ApiProperty({ enum: CertificateProvider })
  provider: CertificateProvider;

  @ApiProperty()
  issuer: string;

  @ApiProperty()
  issueDate: Date;

  @ApiProperty()
  expirationDate: Date;

  @ApiProperty()
  autoRenew: boolean;

  @ApiProperty()
  isExpired: boolean;

  @ApiProperty()
  daysUntilExpiration: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
