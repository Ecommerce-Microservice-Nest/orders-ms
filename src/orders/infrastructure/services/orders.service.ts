import { Injectable } from '@nestjs/common';
import {
  CreateOrderDto,
  FindAllOrdersUseCase,
  GetOneOrderUseCase,
} from 'src/orders/application';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { PaginationDto } from 'src/common';

@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOneOrderUseCase: GetOneOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.findAllOrdersUseCase.execute(paginationDto);
  }

  findOne(id: string) {
    return this.getOneOrderUseCase.execute(id);
  }
}
