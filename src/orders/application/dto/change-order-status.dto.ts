import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatusList } from '../interfaces/order.enum';
import { OrderStatus } from '@prisma/client';

export class ChangeOrderStatusDto {
  @IsUUID()
  id: string;

  @IsEnum(OrderStatusList, {
    message: `Posible satus values are ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
