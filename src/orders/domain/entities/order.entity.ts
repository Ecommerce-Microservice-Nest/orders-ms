import { OrderItem, PrismaOrderItemData } from './order-item.entity';

interface PrismaOrderData {
  id: string;
  totalAmount: number;
  totalItems: number;
  status: string;
  paid: boolean;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  OrderItem?: PrismaOrderItemData[];
}
export class Order {
  constructor(
    public readonly id: string,
    public readonly totalAmount: number,
    public readonly totalItems: number,
    public readonly status: string,
    public readonly paid: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly paidAt?: Date | null,
    public readonly OrderItems?: OrderItem[],
  ) {}

  static fromPrisma(prismaOrder: PrismaOrderData): Order {
    const orderItems = prismaOrder.OrderItem?.map((item) =>
      OrderItem.fromPrisma(item),
    );

    console.log('Prisma Order Data:', prismaOrder);

    return new Order(
      prismaOrder.id,
      prismaOrder.totalAmount,
      prismaOrder.totalItems,
      prismaOrder.status,
      prismaOrder.paid,
      prismaOrder.createdAt,
      prismaOrder.updatedAt,
      prismaOrder.paidAt || null,
      orderItems,
    );
  }

  calculateTotal(): number {
    return (
      this.OrderItems?.reduce((total, item) => total + item.getSubtotal(), 0) ||
      this.totalAmount
    );
  }
}
