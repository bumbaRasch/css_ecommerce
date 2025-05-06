import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../../../../libs/shared/src/entities/customer.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of all customers',
  })
  async getAll(): Promise<Customer[]> {
    const customers = await this.customersService.getAllCustomers();
    if (!customers) {
      throw new NotFoundException(`Customers not found`);
    }
    return customers;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID with favorite products' })
  @ApiParam({ name: 'id', type: Number, description: 'Customer ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer details with favorite products',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
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
