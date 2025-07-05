import { MetaDataAllOrders, Order } from 'src/orders/domain';
import { CreateOrderDto } from '../dto/create-order.dto';

import { OrderStatus } from '@prisma/client';
import { FindAllOrdersDto } from '../dto/find-all-orders.dto';
import { Product } from '../interfaces/product.interface';

export interface IOrderRepository {
  create(data: CreateOrderDto, products: Product[]): Promise<Order>;
  findAll(
    findAllOrdersDto: FindAllOrdersDto,
  ): Promise<{ data: Order[]; meta: MetaDataAllOrders }>;
  findById(id: string): Promise<Order | null>;
  changeOrderStatus(id: string, status: OrderStatus): Promise<Order>;
}
