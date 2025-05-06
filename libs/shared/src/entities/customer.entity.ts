import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

export class Customer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ type: () => Product, isArray: true, required: false })
  favorites?: Product[];
}
