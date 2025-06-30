import { Inject, Injectable } from '@nestjs/common';
import { Order, ORDER_Repository } from 'src/orders/domain';
import { IOrderRepository } from '../ports/order-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_Repository)
    private readonly repository: IOrderRepository,
  ) {}

  execute(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.repository.create(createOrderDto);
  }
}
