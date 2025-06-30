import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from '../ports/order-repository.interface';
import { MetaDataAllOrders, Order, ORDER_Repository } from 'src/orders/domain';
import { FindAllOrdersDto } from '../dto/find-all-orders.dto';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    @Inject(ORDER_Repository)
    private readonly repository: IOrderRepository,
  ) {}

  execute(
    findAllOrdersDto: FindAllOrdersDto,
  ): Promise<{ data: Order[]; meta: MetaDataAllOrders }> {
    return this.repository.findAll(findAllOrdersDto);
  }
}
