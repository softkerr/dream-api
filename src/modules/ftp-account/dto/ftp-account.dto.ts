import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export enum FtpProtocol {
  FTP = 'FTP',
  SFTP = 'SFTP',
  FTPS = 'FTPS',
}

export class CreateFtpAccountDto {
  @ApiProperty({ description: 'Server ID' })
  @IsInt()
  serverId: number;

  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Password (will be hashed)' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Home directory' })
  @IsString()
  @IsNotEmpty()
  homeDirectory: string;

  @ApiProperty({ description: 'Protocol', enum: FtpProtocol, default: 'SFTP' })
  @IsEnum(FtpProtocol)
  protocol: FtpProtocol;

  @ApiProperty({ description: 'Quota in MB', required: false })
  @IsOptional()
  @IsNumber()
  quotaMB?: number;

  @ApiProperty({ description: 'Read permission', default: true })
  @IsOptional()
  @IsBoolean()
  canRead?: boolean;

  @ApiProperty({ description: 'Write permission', default: true })
  @IsOptional()
  @IsBoolean()
  canWrite?: boolean;

  @ApiProperty({ description: 'Delete permission', default: false })
  @IsOptional()
  @IsBoolean()
  canDelete?: boolean;
}

export class UpdateFtpAccountDto {
  @ApiProperty({ description: 'Password', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'Home directory', required: false })
  @IsOptional()
  @IsString()
  homeDirectory?: string;

  @ApiProperty({ description: 'Quota in MB', required: false })
  @IsOptional()
  @IsNumber()
  quotaMB?: number;

  @ApiProperty({ description: 'Read permission', required: false })
  @IsOptional()
  @IsBoolean()
  canRead?: boolean;

  @ApiProperty({ description: 'Write permission', required: false })
  @IsOptional()
  @IsBoolean()
  canWrite?: boolean;

  @ApiProperty({ description: 'Delete permission', required: false })
  @IsOptional()
  @IsBoolean()
  canDelete?: boolean;
}
