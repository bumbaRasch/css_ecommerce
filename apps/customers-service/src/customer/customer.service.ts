import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    this.logger.log('Fetching all customers');
    return this.databaseService.customer.findMany();
  }

  async findOne(id: number) {
    this.logger.log(`Fetching customer with ID ${id}`);
    return this.databaseService.customer.findUnique({ where: { id } });
  }
}
