import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMetricsDto } from './dto/metrics.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateMetricsDto) {
    return this.prisma.metrics.create({
      data: createDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [metrics, total] = await Promise.all([
      this.prisma.metrics.findMany({
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
      this.prisma.metrics.count(),
    ]);

    return {
      data: metrics,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByServer(serverId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [metrics, total] = await Promise.all([
      this.prisma.metrics.findMany({
        where: { serverId },
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
      }),
      this.prisma.metrics.count({ where: { serverId } }),
    ]);

    return {
      data: metrics,
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

    const [metrics, total] = await Promise.all([
      this.prisma.metrics.findMany({
        where: { websiteId },
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
      }),
      this.prisma.metrics.count({ where: { websiteId } }),
    ]);

    return {
      data: metrics,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
