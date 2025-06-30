import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order, ORDER_Repository } from 'src/orders/domain';
import { IOrderRepository } from '../ports/order-repository.interface';
import { ChangeOrderStatusDto } from '../dto/change-order-status.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ChangeOrderStatusUseCase {
  constructor(
    @Inject(ORDER_Repository)
    private readonly repository: IOrderRepository,
  ) {}

  async execute(changeOrderStatusDto: ChangeOrderStatusDto): Promise<Order> {
    const { id, status } = changeOrderStatusDto;
    const order = await this.repository.findById(id);
    if (!order) {
      throw new RpcException({
        message: `Order with id ${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }
    return await this.repository.changeOrderStatus(id, status);
  }
}
