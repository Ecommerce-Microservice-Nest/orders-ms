import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import {
  CreateOrderDto,
  FindAllOrdersDto,
  IOrderRepository,
} from 'src/orders/application';
import { Order, MetaDataAllOrders } from 'src/orders/domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismarProductRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto): Promise<Order> {
    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);

    const created = await this.prisma.order.create({
      data: {
        totalAmount,
        totalItems,
        OrderItem: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        OrderItem: true,
      },
    });

    return Order.fromPrisma(created);
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
