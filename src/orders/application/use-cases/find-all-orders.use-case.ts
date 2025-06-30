import { Injectable, Inject } from '@nestjs/common';
import { PaginationDto } from 'src/common';
import { IOrderRepository } from '../ports/order-repository.interface';
import { MetaDataAllOrders, Order, ORDER_Repository } from 'src/orders/domain';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    @Inject(ORDER_Repository)
    private readonly repository: IOrderRepository,
  ) {}

  execute(
    paginationDto: PaginationDto,
  ): Promise<{ data: Order[]; meta: MetaDataAllOrders }> {
    return this.repository.findAll(paginationDto);
  }
}
