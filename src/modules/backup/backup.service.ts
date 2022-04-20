import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBackupDto, UpdateBackupDto } from './dto/backup.dto';

@Injectable()
export class BackupService {
  constructor(private prisma: PrismaService) {}

  async create(createBackupDto: CreateBackupDto) {
    return this.prisma.backup.create({
      data: createBackupDto,
      include: {
        server: { select: { id: true, name: true } },
        website: { select: { id: true, domain: { select: { name: true } } } },
        database: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [backups, total] = await Promise.all([
      this.prisma.backup.findMany({
        skip,
        take: limit,
        include: {
          server: { select: { id: true, name: true } },
          website: { select: { id: true, domain: { select: { name: true } } } },
          database: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.backup.count(),
    ]);

    return {
      data: backups,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const backup = await this.prisma.backup.findUnique({
      where: { id },
      include: {
        server: { select: { id: true, name: true } },
        website: { select: { id: true, domain: { select: { name: true } } } },
        database: { select: { id: true, name: true } },
      },
    });

    if (!backup) {
      throw new NotFoundException(`Backup with ID ${id} not found`);
    }

    return backup;
  }

  async update(id: number, updateBackupDto: UpdateBackupDto) {
    await this.findOne(id);

    return this.prisma.backup.update({
      where: { id },
      data: updateBackupDto,
      include: {
        server: { select: { id: true, name: true } },
        website: { select: { id: true, domain: { select: { name: true } } } },
        database: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.backup.delete({ where: { id } });
  }

  async findByServer(serverId: number) {
    return this.prisma.backup.findMany({
      where: { serverId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByWebsite(websiteId: number) {
    return this.prisma.backup.findMany({
      where: { websiteId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
