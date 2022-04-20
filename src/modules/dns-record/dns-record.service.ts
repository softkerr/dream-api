import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDnsRecordDto, UpdateDnsRecordDto } from './dto/dns-record.dto';

@Injectable()
export class DnsRecordService {
  constructor(private prisma: PrismaService) {}

  async create(createDnsRecordDto: CreateDnsRecordDto) {
    // Check if domain exists
    const domain = await this.prisma.domain.findUnique({
      where: { id: createDnsRecordDto.domainId },
    });

    if (!domain) {
      throw new NotFoundException(
        `Domain with ID ${createDnsRecordDto.domainId} not found`,
      );
    }

    // Check for duplicate record
    const existing = await this.prisma.dnsRecord.findFirst({
      where: {
        domainId: createDnsRecordDto.domainId,
        type: createDnsRecordDto.type,
        name: createDnsRecordDto.name,
      },
    });

    if (existing) {
      throw new ConflictException(
        `DNS record with type ${createDnsRecordDto.type} and name ${createDnsRecordDto.name} already exists for this domain`,
      );
    }

    return this.prisma.dnsRecord.create({
      data: createDnsRecordDto,
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10, domainId?: number) {
    const skip = (page - 1) * limit;

    const where = domainId ? { domainId } : {};

    const [records, total] = await Promise.all([
      this.prisma.dnsRecord.findMany({
        where,
        skip,
        take: limit,
        include: {
          domain: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.dnsRecord.count({ where }),
    ]);

    return {
      data: records,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const record = await this.prisma.dnsRecord.findUnique({
      where: { id },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(`DNS record with ID ${id} not found`);
    }

    return record;
  }

  async update(id: number, updateDnsRecordDto: UpdateDnsRecordDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.dnsRecord.update({
      where: { id },
      data: updateDnsRecordDto,
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.dnsRecord.delete({
      where: { id },
    });
  }

  async findByDomain(domainId: number) {
    return this.prisma.dnsRecord.findMany({
      where: { domainId },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    });
  }

  async findByType(type: string, domainId?: number) {
    const where = domainId ? { type, domainId } : { type };

    return this.prisma.dnsRecord.findMany({
      where,
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}
