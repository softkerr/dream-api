import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateFirewallRuleDto, UpdateFirewallRuleDto } from './dto/firewall-rule.dto';

@Injectable()
export class FirewallRuleService {
  constructor(private prisma: PrismaService) {}

  async create(createFirewallRuleDto: CreateFirewallRuleDto) {
    return this.prisma.firewallRule.create({
      data: createFirewallRuleDto,
      include: { server: { select: { id: true, name: true } } },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [rules, total] = await Promise.all([
      this.prisma.firewallRule.findMany({
        skip,
        take: limit,
        include: { server: { select: { id: true, name: true } } },
        orderBy: { priority: 'asc' },
      }),
      this.prisma.firewallRule.count(),
    ]);

    return { data: rules, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const rule = await this.prisma.firewallRule.findUnique({
      where: { id },
      include: { server: { select: { id: true, name: true } } },
    });

    if (!rule) {
      throw new NotFoundException(`Firewall rule with ID ${id} not found`);
    }

    return rule;
  }

  async update(id: number, updateFirewallRuleDto: UpdateFirewallRuleDto) {
    await this.findOne(id);
    return this.prisma.firewallRule.update({
      where: { id },
      data: updateFirewallRuleDto,
      include: { server: { select: { id: true, name: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.firewallRule.delete({ where: { id } });
  }

  async findByServer(serverId: number) {
    return this.prisma.firewallRule.findMany({
      where: { serverId },
      orderBy: { priority: 'asc' },
    });
  }
}
