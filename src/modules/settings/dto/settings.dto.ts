import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsObject } from 'class-validator';

export class CreateGlobalSettingDto {
  @ApiProperty({ example: 'max_upload_size' })
  @IsString()
  key: string;

  @ApiProperty({ example: { size: 10485760, unit: 'bytes' } })
  @IsObject()
  value: Record<string, any>;

  @ApiProperty({ example: 'Maximum file upload size', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateGlobalSettingDto {
  @ApiProperty({ required: false })
  @IsObject()
  value?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  isPublic?: boolean;
}
