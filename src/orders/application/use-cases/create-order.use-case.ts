import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order, ORDER_Repository } from 'src/orders/domain';
import { IOrderRepository } from '../ports/order-repository.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PRODUCT_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_Repository)
    private readonly repository: IOrderRepository,
    @Inject(PRODUCT_SERVICE) // ← Directamente ClientProxy
    private readonly productsClient: ClientProxy,
  ) {}

  async execute(
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order; products: Product[] }> {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const uniqueIds = [...new Set(productIds)];

    try {
      // ✅ ESTO SÍ DETIENE LA EJECUCIÓN
      const products: Product[] = await firstValueFrom(
        this.productsClient.send({ cmd: 'validate_products' }, uniqueIds),
      );

      if (!products || products.length !== uniqueIds.length) {
        throw new RpcException({
          message: 'Some products were not found',
          status: HttpStatus.BAD_REQUEST,
        });
      }

      // Solo llega aquí si la validación pasó
      const order = await this.repository.create(createOrderDto, products);
      return { order, products };
    } catch (error) {
      console.log('Error validating products:', error);
      throw new RpcException({
        message: 'Error validating products',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
