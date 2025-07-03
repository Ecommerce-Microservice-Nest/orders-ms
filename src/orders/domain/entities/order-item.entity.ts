export interface PrismaOrderItemData {
  id: string;
  productId: number;
  quantity: number;
  price: number;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderItem {
  constructor(
    public readonly id: string,
    public readonly productId: number,
    public readonly quantity: number,
    public readonly price: number,
    public readonly orderId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromPrisma(prismaOrderItem: PrismaOrderItemData): OrderItem {
    return new OrderItem(
      prismaOrderItem.id,
      prismaOrderItem.productId,
      prismaOrderItem.quantity,
      prismaOrderItem.price,
      prismaOrderItem.orderId,
      prismaOrderItem.createdAt,
      prismaOrderItem.updatedAt,
    );
  }

  getSubtotal(): number {
    return this.quantity * this.price;
  }

  canBeModified(): boolean {
    return this.quantity > 0;
  }
}
