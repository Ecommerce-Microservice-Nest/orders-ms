import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/application';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

@Injectable()
export class OrdersService {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}
  create(createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
