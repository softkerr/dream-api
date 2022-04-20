import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDomainDto, UpdateDomainDto } from './dto/domain.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  async create(createDomainDto: CreateDomainDto) {
    // Check if domain name already exists
    const existing = await this.prisma.domain.findUnique({
      where: { name: createDomainDto.name },
    });

    if (existing) {
      throw new BadRequestException('Domain already exists');
    }

    return this.prisma.domain.create({
      data: createDomainDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [domains, total] = await Promise.all([
      this.prisma.domain.findMany({
        skip,
        take: limit,
        include: {
          websites: true,
          settings: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.domain.count(),
    ]);

    return {
      data: domains,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const domain = await this.prisma.domain.findUnique({
      where: { id },
      include: {
        websites: true,
        settings: true,
      },
    });

    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`);
    }

    return domain;
  }

  async update(id: string, updateDomainDto: UpdateDomainDto) {
    await this.findOne(id);

    // Check name uniqueness if updating
    if (updateDomainDto.name) {
      const existing = await this.prisma.domain.findUnique({
        where: { name: updateDomainDto.name },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('Domain name already in use');
      }
    }

    return this.prisma.domain.update({
      where: { id },
      data: updateDomainDto,
      include: {
        websites: true,
        settings: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.domain.delete({
      where: { id },
    });

    return { message: 'Domain deleted successfully' };
  }
}
