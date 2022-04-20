import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDedicatedServerDto, UpdateDedicatedServerDto } from './dto/dedicated-server.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class DedicatedServerService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateDedicatedServerDto) {
    return this.prisma.dedicatedServer.create({
      data: createDto,
      include: {
        server: true,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [servers, total] = await Promise.all([
      this.prisma.dedicatedServer.findMany({
        skip,
        take: limit,
        include: {
          server: true,
          settings: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.dedicatedServer.count(),
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
    const server = await this.prisma.dedicatedServer.findUnique({
      where: { id },
      include: {
        server: true,
        settings: true,
        metrics: {
          take: 10,
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!server) {
      throw new NotFoundException(`Dedicated server with ID ${id} not found`);
    }

    return server;
  }

  async update(id: string, updateDto: UpdateDedicatedServerDto) {
    await this.findOne(id);

    return this.prisma.dedicatedServer.update({
      where: { id },
      data: updateDto,
      include: {
        server: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.dedicatedServer.delete({
      where: { id },
    });

    return { message: 'Dedicated server deleted successfully' };
  }
}
