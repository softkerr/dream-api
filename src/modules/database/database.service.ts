import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDatabaseDto, UpdateDatabaseDto } from './dto/database.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}

  async create(createDatabaseDto: CreateDatabaseDto) {
    const existing = await this.prisma.database.findFirst({
      where: {
        serverId: createDatabaseDto.serverId,
        name: createDatabaseDto.name,
      },
    });

    if (existing) {
      throw new ConflictException(`Database ${createDatabaseDto.name} already exists on this server`);
    }

    const hashedPassword = await bcrypt.hash(createDatabaseDto.dbPassword, 10);

    return this.prisma.database.create({
      data: {
        ...createDatabaseDto,
        dbPassword: hashedPassword,
      },
      include: {
        server: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [databases, total] = await Promise.all([
      this.prisma.database.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          serverId: true,
          name: true,
          type: true,
          dbUser: true,
          host: true,
          port: true,
          sizeMB: true,
          createdAt: true,
          updatedAt: true,
          server: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.database.count(),
    ]);

    return { data: databases, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const database = await this.prisma.database.findUnique({
      where: { id },
      select: {
        id: true,
        serverId: true,
        name: true,
        type: true,
        dbUser: true,
        host: true,
        port: true,
        sizeMB: true,
        createdAt: true,
        updatedAt: true,
        server: { select: { id: true, name: true } },
      },
    });

    if (!database) {
      throw new NotFoundException(`Database with ID ${id} not found`);
    }

    return database;
  }

  async update(id: number, updateDatabaseDto: UpdateDatabaseDto) {
    await this.findOne(id);

    const data: any = { ...updateDatabaseDto };
    if (updateDatabaseDto.dbPassword) {
      data.dbPassword = await bcrypt.hash(updateDatabaseDto.dbPassword, 10);
    }

    return this.prisma.database.update({
      where: { id },
      data,
      select: {
        id: true,
        serverId: true,
        name: true,
        type: true,
        dbUser: true,
        host: true,
        port: true,
        sizeMB: true,
        createdAt: true,
        updatedAt: true,
        server: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.database.delete({ where: { id } });
  }
}
