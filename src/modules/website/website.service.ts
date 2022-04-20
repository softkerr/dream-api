import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto/website.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class WebsiteService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateWebsiteDto) {
    const existing = await this.prisma.website.findUnique({
      where: { url: createDto.url },
    });

    if (existing) {
      throw new BadRequestException('Website with this URL already exists');
    }

    return this.prisma.website.create({
      data: createDto,
      include: {
        domain: true,
        server: true,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [websites, total] = await Promise.all([
      this.prisma.website.findMany({
        skip,
        take: limit,
        include: {
          domain: true,
          server: true,
          settings: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.website.count(),
    ]);

    return {
      data: websites,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const website = await this.prisma.website.findUnique({
      where: { id },
      include: {
        domain: true,
        server: true,
        settings: true,
        metrics: {
          take: 10,
          orderBy: { timestamp: 'desc' },
        },
        analytics: {
          take: 10,
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!website) {
      throw new NotFoundException(`Website with ID ${id} not found`);
    }

    return website;
  }

  async update(id: string, updateDto: UpdateWebsiteDto) {
    await this.findOne(id);

    if (updateDto.url) {
      const existing = await this.prisma.website.findUnique({
        where: { url: updateDto.url },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('URL already in use');
      }
    }

    return this.prisma.website.update({
      where: { id },
      data: updateDto,
      include: {
        domain: true,
        server: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.website.delete({
      where: { id },
    });

    return { message: 'Website deleted successfully' };
  }
}
