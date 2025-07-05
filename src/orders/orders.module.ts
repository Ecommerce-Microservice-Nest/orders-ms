import { Module } from '@nestjs/common';

import { OrdersController } from './infrastructure/controllers/orders.controller';
import { OrdersService } from './infrastructure/services/orders.service';
import {
  ChangeOrderStatusUseCase,
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  GetOneOrderUseCase,
} from './application';
import { ORDER_Repository } from './domain';
import { PrismarProductRepository } from './infrastructure/persistence/order-prisma.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/services';
import { envs } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    CreateOrderUseCase,
    GetOneOrderUseCase,
    FindAllOrdersUseCase,
    ChangeOrderStatusUseCase,
    {
      provide: ORDER_Repository,
      useClass: PrismarProductRepository,
    },
  ],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          port: envs.productsMicroservicePort,
          host: envs.productsMicroserviceHost,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
