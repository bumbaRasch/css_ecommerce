import { Product } from './product.entity';

export class Customer {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  favorites?: Product[];
}
