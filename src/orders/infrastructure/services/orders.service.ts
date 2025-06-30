import { Injectable } from '@nestjs/common';
import { CreateOrderDto, GetOneOrderUseCase } from 'src/orders/application';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOneOrderUseCase: GetOneOrderUseCase,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: string) {
    return this.getOneOrderUseCase.execute(id);
  }
}
