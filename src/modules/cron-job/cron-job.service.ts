import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCronJobDto, UpdateCronJobDto } from './dto/cron-job.dto';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService) {}

  async create(createCronJobDto: CreateCronJobDto) {
    return this.prisma.cronJob.create({
      data: createCronJobDto,
      include: { server: { select: { id: true, name: true } } },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      this.prisma.cronJob.findMany({
        skip,
        take: limit,
        include: { server: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.cronJob.count(),
    ]);

    return { data: jobs, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const job = await this.prisma.cronJob.findUnique({
      where: { id },
      include: { server: { select: { id: true, name: true } } },
    });

    if (!job) {
      throw new NotFoundException(`Cron job with ID ${id} not found`);
    }

    return job;
  }

  async update(id: number, updateCronJobDto: UpdateCronJobDto) {
    await this.findOne(id);
    return this.prisma.cronJob.update({
      where: { id },
      data: updateCronJobDto,
      include: { server: { select: { id: true, name: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cronJob.delete({ where: { id } });
  }
}
