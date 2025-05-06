import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    this.logger.log('Fetching all products');
    return this.databaseService.product.findMany();
  }

  async findOne(id: number) {
    this.logger.log(`Fetching product with ID ${id}`);
    const product = await this.databaseService.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getRandom(count: number) {
    this.logger.log(`Fetching ${count} random products`);
    return this.databaseService.$queryRaw`
      SELECT * 
      FROM 
        Product 
      ORDER BY 
        RAND() 
      LIMIT 
        ${count}
    `;
  }
}
