import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean, IsEnum, IsIP } from 'class-validator';

export enum FirewallAction {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}

export enum FirewallProtocol {
  TCP = 'TCP',
  UDP = 'UDP',
  ICMP = 'ICMP',
  ALL = 'ALL',
}

export class CreateFirewallRuleDto {
  @ApiProperty({ description: 'Server ID' })
  @IsInt()
  serverId: number;

  @ApiProperty({ description: 'Rule name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'IP address or CIDR', example: '192.168.1.0/24' })
  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @ApiProperty({ description: 'Protocol', enum: FirewallProtocol })
  @IsEnum(FirewallProtocol)
  protocol: FirewallProtocol;

  @ApiProperty({ description: 'Port or port range', example: '80 or 8000-9000', required: false })
  @IsOptional()
  @IsString()
  port?: string;

  @ApiProperty({ description: 'Action', enum: FirewallAction })
  @IsEnum(FirewallAction)
  action: FirewallAction;

  @ApiProperty({ description: 'Priority (lower = higher priority)', default: 100 })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiProperty({ description: 'Is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateFirewallRuleDto {
  @ApiProperty({ description: 'Rule name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'IP address or CIDR', required: false })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({ description: 'Protocol', required: false })
  @IsOptional()
  @IsEnum(FirewallProtocol)
  protocol?: FirewallProtocol;

  @ApiProperty({ description: 'Port or port range', required: false })
  @IsOptional()
  @IsString()
  port?: string;

  @ApiProperty({ description: 'Action', required: false })
  @IsOptional()
  @IsEnum(FirewallAction)
  action?: FirewallAction;

  @ApiProperty({ description: 'Priority', required: false })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiProperty({ description: 'Is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
