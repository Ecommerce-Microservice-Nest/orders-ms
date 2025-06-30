import { Module } from '@nestjs/common';

import { OrdersController } from './infrastructure/controllers/orders.controller';
import { OrdersService } from './infrastructure/services/orders.service';
import {
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  GetOneOrderUseCase,
} from './application';
import { ORDER_Repository } from './domain';
import { PrismarProductRepository } from './infrastructure/persistence/order-prisma.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    CreateOrderUseCase,
    GetOneOrderUseCase,
    FindAllOrdersUseCase,
    {
      provide: ORDER_Repository,
      useClass: PrismarProductRepository,
    },
  ],
})
export class OrdersModule {}
