import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateGlobalSettingDto, UpdateGlobalSettingDto } from './dto/settings.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async createGlobalSetting(createDto: CreateGlobalSettingDto) {
    const existing = await this.prisma.globalSettings.findUnique({
      where: { key: createDto.key },
    });

    if (existing) {
      throw new BadRequestException('Setting with this key already exists');
    }

    return this.prisma.globalSettings.create({
      data: createDto,
    });
  }

  async findAllGlobalSettings(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [settings, total] = await Promise.all([
      this.prisma.globalSettings.findMany({
        skip,
        take: limit,
        orderBy: { key: 'asc' },
      }),
      this.prisma.globalSettings.count(),
    ]);

    return {
      data: settings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findPublicSettings() {
    return this.prisma.globalSettings.findMany({
      where: { isPublic: true },
      select: {
        key: true,
        value: true,
        description: true,
      },
    });
  }

  async findGlobalSettingByKey(key: string) {
    const setting = await this.prisma.globalSettings.findUnique({
      where: { key },
    });

    if (!setting) {
      throw new NotFoundException(`Setting with key ${key} not found`);
    }

    return setting;
  }

  async updateGlobalSetting(key: string, updateDto: UpdateGlobalSettingDto) {
    await this.findGlobalSettingByKey(key);

    return this.prisma.globalSettings.update({
      where: { key },
      data: updateDto,
    });
  }

  async removeGlobalSetting(key: string) {
    await this.findGlobalSettingByKey(key);

    await this.prisma.globalSettings.delete({
      where: { key },
    });

    return { message: 'Setting deleted successfully' };
  }
}
