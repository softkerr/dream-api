import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum } from 'class-validator';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum TicketCategory {
  TECHNICAL = 'TECHNICAL',
  BILLING = 'BILLING',
  GENERAL = 'GENERAL',
  FEATURE_REQUEST = 'FEATURE_REQUEST',
  BUG_REPORT = 'BUG_REPORT',
}

export class CreateSupportTicketDto {
  @ApiProperty({ description: 'User ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'Subject' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Category', enum: TicketCategory })
  @IsEnum(TicketCategory)
  category: TicketCategory;

  @ApiProperty({ description: 'Priority', enum: TicketPriority, default: 'MEDIUM' })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({ description: 'Status', enum: TicketStatus, default: 'OPEN' })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;
}

export class UpdateSupportTicketDto {
  @ApiProperty({ description: 'Subject', required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Category', enum: TicketCategory, required: false })
  @IsOptional()
  @IsEnum(TicketCategory)
  category?: TicketCategory;

  @ApiProperty({ description: 'Priority', enum: TicketPriority, required: false })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiProperty({ description: 'Status', enum: TicketStatus, required: false })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiProperty({ description: 'Assigned to user ID', required: false })
  @IsOptional()
  @IsInt()
  assignedToId?: number;

  @ApiProperty({ description: 'Response message', required: false })
  @IsOptional()
  @IsString()
  response?: string;
}
