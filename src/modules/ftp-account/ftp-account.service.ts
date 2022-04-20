import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateFtpAccountDto, UpdateFtpAccountDto } from './dto/ftp-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FtpAccountService {
  constructor(private prisma: PrismaService) {}

  async create(createFtpAccountDto: CreateFtpAccountDto) {
    const existing = await this.prisma.ftpAccount.findFirst({
      where: {
        serverId: createFtpAccountDto.serverId,
        username: createFtpAccountDto.username,
      },
    });

    if (existing) {
      throw new ConflictException(`FTP account ${createFtpAccountDto.username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(createFtpAccountDto.password, 10);

    return this.prisma.ftpAccount.create({
      data: { ...createFtpAccountDto, password: hashedPassword },
      include: { server: { select: { id: true, name: true } } },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [accounts, total] = await Promise.all([
      this.prisma.ftpAccount.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          serverId: true,
          username: true,
          homeDirectory: true,
          protocol: true,
          quotaMB: true,
          canRead: true,
          canWrite: true,
          canDelete: true,
          createdAt: true,
          updatedAt: true,
          server: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.ftpAccount.count(),
    ]);

    return { data: accounts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const account = await this.prisma.ftpAccount.findUnique({
      where: { id },
      select: {
        id: true,
        serverId: true,
        username: true,
        homeDirectory: true,
        protocol: true,
        quotaMB: true,
        canRead: true,
        canWrite: true,
        canDelete: true,
        createdAt: true,
        updatedAt: true,
        server: { select: { id: true, name: true } },
      },
    });

    if (!account) {
      throw new NotFoundException(`FTP account with ID ${id} not found`);
    }

    return account;
  }

  async update(id: number, updateFtpAccountDto: UpdateFtpAccountDto) {
    await this.findOne(id);

    const data: any = { ...updateFtpAccountDto };
    if (updateFtpAccountDto.password) {
      data.password = await bcrypt.hash(updateFtpAccountDto.password, 10);
    }

    return this.prisma.ftpAccount.update({
      where: { id },
      data,
      select: {
        id: true,
        serverId: true,
        username: true,
        homeDirectory: true,
        protocol: true,
        quotaMB: true,
        canRead: true,
        canWrite: true,
        canDelete: true,
        createdAt: true,
        updatedAt: true,
        server: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ftpAccount.delete({ where: { id } });
  }
}
