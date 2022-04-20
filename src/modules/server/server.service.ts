import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateServerDto, UpdateServerDto } from './dto/server.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  async create(createServerDto: CreateServerDto) {
    const existing = await this.prisma.server.findUnique({
      where: { ipAddress: createServerDto.ipAddress },
    });

    if (existing) {
      throw new BadRequestException('Server with this IP address already exists');
    }

    return this.prisma.server.create({
      data: createServerDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [servers, total] = await Promise.all([
      this.prisma.server.findMany({
        skip,
        take: limit,
        include: {
          vps: true,
          dedicatedServers: true,
          websites: true,
          settings: true,
          _count: {
            select: {
              vps: true,
              dedicatedServers: true,
              websites: true,
              metrics: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.server.count(),
    ]);

    return {
      data: servers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const server = await this.prisma.server.findUnique({
      where: { id },
      include: {
        vps: true,
        dedicatedServers: true,
        websites: true,
        settings: true,
        metrics: {
          take: 10,
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!server) {
      throw new NotFoundException(`Server with ID ${id} not found`);
    }

    return server;
  }

  async update(id: string, updateServerDto: UpdateServerDto) {
    await this.findOne(id);

    if (updateServerDto.ipAddress) {
      const existing = await this.prisma.server.findUnique({
        where: { ipAddress: updateServerDto.ipAddress },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('IP address already in use');
      }
    }

    return this.prisma.server.update({
      where: { id },
      data: updateServerDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.server.delete({
      where: { id },
    });

    return { message: 'Server deleted successfully' };
  }
}
