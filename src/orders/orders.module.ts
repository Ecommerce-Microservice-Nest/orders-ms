import { Module } from '@nestjs/common';

import { OrdersController } from './infrastructure/controllers/orders.controller';
import { OrdersService } from './infrastructure/services/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
