import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../../../../libs/shared/src/entities/customer.entity';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAll(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  async getCustomerWithFavorites(@Param('id') id: string): Promise<Customer> {
    const customer = await this.customersService.getCustomerWithFavorites(
      Number(id),
    );
    if (!customer) {
      throw new NotFoundException(`Customer not found`);
    }
    return customer;
  }
}
