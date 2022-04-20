import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateVpsDto, UpdateVpsDto } from './dto/vps.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class VpsService {
  constructor(private prisma: PrismaService) {}

  async create(createVpsDto: CreateVpsDto) {
    return this.prisma.vPS.create({
      data: createVpsDto,
      include: {
        server: true,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [vps, total] = await Promise.all([
      this.prisma.vPS.findMany({
        skip,
        take: limit,
        include: {
          server: true,
          settings: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vPS.count(),
    ]);

    return {
      data: vps,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const vps = await this.prisma.vPS.findUnique({
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

    if (!vps) {
      throw new NotFoundException(`VPS with ID ${id} not found`);
    }

    return vps;
  }

  async update(id: string, updateVpsDto: UpdateVpsDto) {
    await this.findOne(id);

    return this.prisma.vPS.update({
      where: { id },
      data: updateVpsDto,
      include: {
        server: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.vPS.delete({
      where: { id },
    });

    return { message: 'VPS deleted successfully' };
  }
}
