import { MetaDataAllOrders, Order } from 'src/orders/domain';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PaginationDto } from 'src/common';

import { OrderStatus } from '@prisma/client';

export interface IOrderRepository {
  create(data: CreateOrderDto): Promise<Order>;
  findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: Order[]; meta: MetaDataAllOrders }>;
  findById(id: string): Promise<Order | null>;
  changeOrderStatus(id: string, status: OrderStatus): Promise<Order>;
}
