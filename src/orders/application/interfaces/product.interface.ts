export interface Product {
  id: number;
  name: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Optional, as it may not be set if the product is not deleted
}

// id: 15,
//     name: 'Blu-ray Player 4K',
//     price: 149.99,
//     available: true,
//     createdAt: 2024-02-27T15:51:32.805Z,
//     updatedAt: 2024-02-27T15:51:32.805Z,
//     deletedAt: undefined
