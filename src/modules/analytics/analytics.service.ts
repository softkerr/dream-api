import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAnalyticsDto } from './dto/analytics.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AnalyticsEventType } from '@prisma/client';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateAnalyticsDto) {
    return this.prisma.analytics.create({
      data: createDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [analytics, total] = await Promise.all([
      this.prisma.analytics.findMany({
        skip,
        take: limit,
        include: {
          server: true,
          vps: true,
          dedicatedServer: true,
          website: true,
        },
        orderBy: { timestamp: 'desc' },
      }),
      this.prisma.analytics.count(),
    ]);

    return {
      data: analytics,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByType(eventType: AnalyticsEventType, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [analytics, total] = await Promise.all([
      this.prisma.analytics.findMany({
        where: { eventType },
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
      }),
      this.prisma.analytics.count({ where: { eventType } }),
    ]);

    return {
      data: analytics,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByWebsite(websiteId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [analytics, total] = await Promise.all([
      this.prisma.analytics.findMany({
        where: { websiteId },
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
      }),
      this.prisma.analytics.count({ where: { websiteId } }),
    ]);

    return {
      data: analytics,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
