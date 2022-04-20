import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import {
  CreateSslCertificateDto,
  UpdateSslCertificateDto,
} from './dto/ssl-certificate.dto';

@Injectable()
export class SslCertificateService {
  constructor(private prisma: PrismaService) {}

  async create(createSslCertificateDto: CreateSslCertificateDto) {
    const domain = await this.prisma.domain.findUnique({
      where: { id: createSslCertificateDto.domainId },
    });

    if (!domain) {
      throw new NotFoundException(
        `Domain with ID ${createSslCertificateDto.domainId} not found`,
      );
    }

    // Check for existing active certificate
    const existing = await this.prisma.sslCertificate.findFirst({
      where: {
        domainId: createSslCertificateDto.domainId,
        expirationDate: {
          gte: new Date(),
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        `An active SSL certificate already exists for this domain`,
      );
    }

    return this.prisma.sslCertificate.create({
      data: createSslCertificateDto,
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

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [certificates, total] = await Promise.all([
      this.prisma.sslCertificate.findMany({
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
        orderBy: { expirationDate: 'asc' },
      }),
      this.prisma.sslCertificate.count(),
    ]);

    return {
      data: certificates,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const certificate = await this.prisma.sslCertificate.findUnique({
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

    if (!certificate) {
      throw new NotFoundException(`SSL certificate with ID ${id} not found`);
    }

    return certificate;
  }

  async update(id: number, updateSslCertificateDto: UpdateSslCertificateDto) {
    await this.findOne(id);

    return this.prisma.sslCertificate.update({
      where: { id },
      data: updateSslCertificateDto,
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
    await this.findOne(id);

    return this.prisma.sslCertificate.delete({
      where: { id },
    });
  }

  async findExpiring(days: number = 30) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    return this.prisma.sslCertificate.findMany({
      where: {
        expirationDate: {
          lte: expirationDate,
          gte: new Date(),
        },
      },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { expirationDate: 'asc' },
    });
  }

  async findExpired() {
    return this.prisma.sslCertificate.findMany({
      where: {
        expirationDate: {
          lt: new Date(),
        },
      },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { expirationDate: 'desc' },
    });
  }
}
