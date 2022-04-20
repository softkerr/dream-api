import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum, IsNumber } from 'class-validator';

export enum DatabaseType {
  MYSQL = 'MYSQL',
  POSTGRESQL = 'POSTGRESQL',
  MONGODB = 'MONGODB',
  REDIS = 'REDIS',
  MARIADB = 'MARIADB',
}

export class CreateDatabaseDto {
  @ApiProperty({ description: 'Server ID' })
  @IsInt()
  serverId: number;

  @ApiProperty({ description: 'Database name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Database type', enum: DatabaseType })
  @IsEnum(DatabaseType)
  type: DatabaseType;

  @ApiProperty({ description: 'Database user' })
  @IsString()
  @IsNotEmpty()
  dbUser: string;

  @ApiProperty({ description: 'Database password (will be hashed)' })
  @IsString()
  @IsNotEmpty()
  dbPassword: string;

  @ApiProperty({ description: 'Host', default: 'localhost', required: false })
  @IsOptional()
  @IsString()
  host?: string;

  @ApiProperty({ description: 'Port', required: false })
  @IsOptional()
  @IsInt()
  port?: number;

  @ApiProperty({ description: 'Size in MB', default: 0, required: false })
  @IsOptional()
  @IsNumber()
  sizeMB?: number;
}

export class UpdateDatabaseDto {
  @ApiProperty({ description: 'Database user', required: false })
  @IsOptional()
  @IsString()
  dbUser?: string;

  @ApiProperty({ description: 'Database password', required: false })
  @IsOptional()
  @IsString()
  dbPassword?: string;

  @ApiProperty({ description: 'Host', required: false })
  @IsOptional()
  @IsString()
  host?: string;

  @ApiProperty({ description: 'Port', required: false })
  @IsOptional()
  @IsInt()
  port?: number;

  @ApiProperty({ description: 'Size in MB', required: false })
  @IsOptional()
  @IsNumber()
  sizeMB?: number;
}
