import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSupportTicketDto, UpdateSupportTicketDto } from './dto/support-ticket.dto';

@Injectable()
export class SupportTicketService {
  constructor(private prisma: PrismaService) {}

  async create(createSupportTicketDto: CreateSupportTicketDto) {
    return this.prisma.supportTicket.create({
      data: createSupportTicketDto,
      include: {
        user: { select: { id: true, email: true, name: true } },
        assignedTo: { select: { id: true, email: true, name: true } },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [tickets, total] = await Promise.all([
      this.prisma.supportTicket.findMany({
        skip,
        take: limit,
        include: {
          user: { select: { id: true, email: true, name: true } },
          assignedTo: { select: { id: true, email: true, name: true } },
        },
        orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      }),
      this.prisma.supportTicket.count(),
    ]);

    return { data: tickets, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true } },
        assignedTo: { select: { id: true, email: true, name: true } },
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateSupportTicketDto: UpdateSupportTicketDto) {
    await this.findOne(id);
    return this.prisma.supportTicket.update({
      where: { id },
      data: updateSupportTicketDto,
      include: {
        user: { select: { id: true, email: true, name: true } },
        assignedTo: { select: { id: true, email: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.supportTicket.delete({ where: { id } });
  }

  async findByUser(userId: number) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.supportTicket.findMany({
      where: { status },
      include: {
        user: { select: { id: true, email: true, name: true } },
        assignedTo: { select: { id: true, email: true, name: true } },
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }
}
