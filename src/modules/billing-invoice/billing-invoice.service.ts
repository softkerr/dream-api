import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBillingInvoiceDto, UpdateBillingInvoiceDto } from './dto/billing-invoice.dto';

@Injectable()
export class BillingInvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(createBillingInvoiceDto: CreateBillingInvoiceDto) {
    return this.prisma.billingInvoice.create({
      data: createBillingInvoiceDto,
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [invoices, total] = await Promise.all([
      this.prisma.billingInvoice.findMany({
        skip,
        take: limit,
        include: { user: { select: { id: true, email: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.billingInvoice.count(),
    ]);

    return { data: invoices, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const invoice = await this.prisma.billingInvoice.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, name: true } } },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(id: number, updateBillingInvoiceDto: UpdateBillingInvoiceDto) {
    await this.findOne(id);
    return this.prisma.billingInvoice.update({
      where: { id },
      data: updateBillingInvoiceDto,
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.billingInvoice.delete({ where: { id } });
  }

  async findByUser(userId: number) {
    return this.prisma.billingInvoice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOverdue() {
    return this.prisma.billingInvoice.findMany({
      where: {
        status: 'PENDING',
        dueDate: { lt: new Date() },
      },
      include: { user: { select: { id: true, email: true, name: true } } },
      orderBy: { dueDate: 'asc' },
    });
  }
}
