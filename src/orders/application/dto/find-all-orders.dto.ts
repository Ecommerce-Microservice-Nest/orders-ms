import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsPositive, IsOptional, IsEnum } from 'class-validator';
import { OrderStatusList } from '../interfaces/order.enum';

export class FindAllOrdersDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList.join(', ')}`,
  })
  @IsOptional()
  status?: OrderStatus;
}
