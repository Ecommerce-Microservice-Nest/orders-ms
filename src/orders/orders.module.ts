import { Module } from '@nestjs/common';

import { OrdersController } from './infrastructure/controllers/orders.controller';
import { OrdersService } from './infrastructure/services/orders.service';
import { CreateOrderUseCase } from './application';
import { ORDER_Repository } from './domain';
import { PrismarProductRepository } from './infrastructure/persistence/order-prisma.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    CreateOrderUseCase,
    {
      provide: ORDER_Repository,
      useClass: PrismarProductRepository,
    },
  ],
})
export class OrdersModule {}
