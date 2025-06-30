import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { CreateOrderDto, IOrderRepository } from 'src/orders/application';
import { Order, MetaDataAllOrders } from 'src/orders/domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismarProductRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto): Promise<Order> {
    const created = await this.prisma.order.create({
      data,
    });
    return Order.fromPrisma(created);
  }
  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: Order[]; meta: MetaDataAllOrders }> {
    const { limit, page } = paginationDto;

    const [totalOrders, orders] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.findMany({
        skip: (page! - 1) * limit!,
        take: limit,
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
