import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateEmailAccountDto {
  @ApiProperty({ description: 'Domain ID' })
  @IsInt()
  domainId: number;

  @ApiProperty({ description: 'Email address', example: 'admin@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password (will be hashed)' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Quota in MB', example: 1000 })
  @IsNumber()
  quotaMB: number;

  @ApiProperty({ description: 'Mailbox path', required: false })
  @IsOptional()
  @IsString()
  mailboxPath?: string;
}

export class UpdateEmailAccountDto {
  @ApiProperty({ description: 'Password', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'Quota in MB', required: false })
  @IsOptional()
  @IsNumber()
  quotaMB?: number;

  @ApiProperty({ description: 'Mailbox path', required: false })
  @IsOptional()
  @IsString()
  mailboxPath?: string;
}
