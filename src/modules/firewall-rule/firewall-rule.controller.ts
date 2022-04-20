import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FirewallRuleService } from './firewall-rule.service';
import { CreateFirewallRuleDto, UpdateFirewallRuleDto } from './dto/firewall-rule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Firewall Rules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('firewall-rules')
export class FirewallRuleController {
  constructor(private readonly firewallRuleService: FirewallRuleService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Create a new firewall rule' })
  create(@Body() createFirewallRuleDto: CreateFirewallRuleDto) {
    return this.firewallRuleService.create(createFirewallRuleDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all firewall rules' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.firewallRuleService.findAll(page, limit);
  }

  @Get('server/:serverId')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get firewall rules by server ID' })
  findByServer(@Param('serverId', ParseIntPipe) serverId: number) {
    return this.firewallRuleService.findByServer(serverId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get a firewall rule by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.firewallRuleService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Update a firewall rule' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFirewallRuleDto: UpdateFirewallRuleDto,
  ) {
    return this.firewallRuleService.update(id, updateFirewallRuleDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a firewall rule' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.firewallRuleService.remove(id);
  }
}
