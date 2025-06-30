interface PrismaOrderData {
  id: string;
  totalAmount: number;
  totalItems: number;
  status: string;
  paid: boolean;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
export class Order {
  constructor(
    public readonly id: string,
    public readonly totalAmount: string,
    public readonly totalItems: string,
    public readonly status: string,
    public readonly paid: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly paidAt?: Date | null,
  ) {}

  static fromPrisma(prismaOrder: PrismaOrderData): Order {
    return new Order(
      prismaOrder.id,
      prismaOrder.totalAmount.toString(),
      prismaOrder.totalItems.toString(),
      prismaOrder.status,
      prismaOrder.paid,
      prismaOrder.createdAt,
      prismaOrder.updatedAt,
      prismaOrder.paidAt || null,
    );
  }
}
