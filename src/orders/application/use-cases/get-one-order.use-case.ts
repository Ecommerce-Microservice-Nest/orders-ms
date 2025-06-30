import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order, ORDER_Repository } from 'src/orders/domain';
import { IOrderRepository } from '../ports/order-repository.interface';

import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetOneOrderUseCase {
  constructor(
    @Inject(ORDER_Repository)
    private readonly repository: IOrderRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.repository.findById(id);
    if (!order) {
      throw new RpcException({
        message: `Order with id ${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }
    return order;
  }
}
