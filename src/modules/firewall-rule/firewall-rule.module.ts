import { Module } from '@nestjs/common';
import { FirewallRuleService } from './firewall-rule.service';
import { FirewallRuleController } from './firewall-rule.controller';

@Module({
  controllers: [FirewallRuleController],
  providers: [FirewallRuleService],
  exports: [FirewallRuleService],
})
export class FirewallRuleModule {}
