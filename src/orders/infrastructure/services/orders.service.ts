import { Injectable } from '@nestjs/common';
import {
  ChangeOrderStatusUseCase,
  CreateOrderDto,
  FindAllOrdersDto,
  FindAllOrdersUseCase,
  GetOneOrderUseCase,
} from 'src/orders/application';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { ChangeOrderStatusDto } from '../../application/dto/change-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOneOrderUseCase: GetOneOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { order, products } =
      await this.createOrderUseCase.execute(createOrderDto);

    // Crear mapa de productos para fácil acceso
    const productMap = new Map(products.map((p) => [p.id, p]));

    return {
      ...order,
      OrderItems: order.OrderItems?.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
        name: productMap.get(item.productId)?.name,
      })),
    };
  }

  findAll(findAllOrdersDto: FindAllOrdersDto) {
    return this.findAllOrdersUseCase.execute(findAllOrdersDto);
  }

  findOne(id: string) {
    return this.getOneOrderUseCase.execute(id);
  }

  changeOrderStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
}
