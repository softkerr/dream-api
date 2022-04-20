import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateEmailAccountDto, UpdateEmailAccountDto } from './dto/email-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmailAccountService {
  constructor(private prisma: PrismaService) {}

  async create(createEmailAccountDto: CreateEmailAccountDto) {
    const existing = await this.prisma.emailAccount.findUnique({
      where: { email: createEmailAccountDto.email },
    });

    if (existing) {
      throw new ConflictException(`Email account ${createEmailAccountDto.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(createEmailAccountDto.password, 10);

    return this.prisma.emailAccount.create({
      data: {
        ...createEmailAccountDto,
        password: hashedPassword,
      },
      include: {
        domain: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [accounts, total] = await Promise.all([
      this.prisma.emailAccount.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          domainId: true,
          email: true,
          quotaMB: true,
          usedMB: true,
          mailboxPath: true,
          createdAt: true,
          updatedAt: true,
          domain: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.emailAccount.count(),
    ]);

    return { data: accounts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const account = await this.prisma.emailAccount.findUnique({
      where: { id },
      select: {
        id: true,
        domainId: true,
        email: true,
        quotaMB: true,
        usedMB: true,
        mailboxPath: true,
        createdAt: true,
        updatedAt: true,
        domain: { select: { id: true, name: true } },
      },
    });

    if (!account) {
      throw new NotFoundException(`Email account with ID ${id} not found`);
    }

    return account;
  }

  async update(id: number, updateEmailAccountDto: UpdateEmailAccountDto) {
    await this.findOne(id);

    const data: any = { ...updateEmailAccountDto };
    if (updateEmailAccountDto.password) {
      data.password = await bcrypt.hash(updateEmailAccountDto.password, 10);
    }

    return this.prisma.emailAccount.update({
      where: { id },
      data,
      select: {
        id: true,
        domainId: true,
        email: true,
        quotaMB: true,
        usedMB: true,
        mailboxPath: true,
        createdAt: true,
        updatedAt: true,
        domain: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.emailAccount.delete({ where: { id } });
  }
}
