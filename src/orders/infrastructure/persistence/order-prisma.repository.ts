import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import {
  CreateOrderDto,
  FindAllOrdersDto,
  IOrderRepository,
} from 'src/orders/application';
import { Product } from 'src/orders/application/interfaces/product.interface';
import { Order, MetaDataAllOrders } from 'src/orders/domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismarProductRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto, products: Product[]): Promise<Order> {
    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);

    // Crear mapa de productos para acceso O(1) y validación
    const productMap = new Map(products.map((p) => [p.id, p]));

    const created = await this.prisma.order.create({
      data: {
        totalAmount,
        totalItems,
        OrderItem: {
          createMany: {
            data: data.items.map((item) => {
              const product = productMap.get(item.productId);
              if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
              }

              return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
              };
            }),
          },
        },
      },
      include: {
        OrderItem: true,
      },
    });

    const order = Order.fromPrisma(created);
    console.log('Order created:', order);
    return order;
  }
  async findAll(
    findAllOrdersDto: FindAllOrdersDto,
  ): Promise<{ data: Order[]; meta: MetaDataAllOrders }> {
    const { limit, page, status } = findAllOrdersDto;

    const where = status ? { status } : {};

    const [totalOrders, orders] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        skip: (page! - 1) * limit!,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const lastPage = Math.ceil(totalOrders / limit!);

    return {
      meta: {
        totalOrders,
        page: page!,
        limit: limit!,
        totalPages: lastPage,
      },
      data: orders.map((order) => Order.fromPrisma(order)),
    };
  }
  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    return order ? Order.fromPrisma(order) : null;
  }
  async changeOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return await this.prisma.order
      .update({
        where: { id },
        data: { status },
      })
      .then((order) => Order.fromPrisma(order));
  }
}
